"""Create timestamped voice beats and original audio score; FFmpeg only for audio/master/QC."""
import json, math, os, pathlib, subprocess, sys, wave, tempfile, re
import numpy as np
P=pathlib.Path(__file__).resolve().parent
os.chdir(P)
def run(*a,**kw): return subprocess.run(list(map(str,a)),check=True,**kw)
def capture(*a): return subprocess.check_output(list(map(str,a)),text=True)
def writewav(p,a,sr=24000):
    with wave.open(str(p),'wb') as f:
        f.setparams((1,2,sr,0,'NONE','not compressed'))
        f.writeframes((np.clip(a,-1,1)*32767).astype('<i2').tobytes())
def secs(p):
    return float(capture('ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',p).strip())
def prepare(ep):
    folder=P/'public'/ep['id']; folder.mkdir(parents=True,exist_ok=True)
    out=P/'out'; out.mkdir(exist_ok=True)
    sr=24000; parts=[]; beats=[]
    with tempfile.TemporaryDirectory() as td:
        for i,line in enumerate(ep['lines']):
            wav=pathlib.Path(td)/f'{i}.wav'
            run(sys.executable,'-m','piper','-m',os.environ.get('PIPER_MODEL','es_ES-davefx-medium.onnx'),'-f',wav,'--',line)
            pcm=subprocess.check_output(['ffmpeg','-v','error','-i',str(wav),'-f','f32le','-ac','1','-ar',str(sr),'-'])
            a=np.frombuffer(pcm,dtype='<f4').copy()
            peak=max(float(np.max(np.abs(a))),.001); a=a/peak*.74
            speech=math.ceil(len(a)/sr*30)
            frames=max(70,speech+10); n=frames*sr//30
            if frames>165: raise ValueError('Narration beat too long; split the script')
            voice=np.pad(a,(0,n-len(a)))
            parts.append(voice); beats.append({'text':line,'frames':frames,'speechFrames':speech})
        voice=np.concatenate(parts); t=np.arange(len(voice))/sr
        rng=np.random.default_rng(sum(map(ord,ep['id'])))
        base={'radio':55,'memory':65.4,'city':49,'sun':58.3,'eye':46.25}[ep['theme']]
        music=(.035*np.sin(2*np.pi*base*t)+.025*np.sin(2*np.pi*base*1.5*t+.4*np.sin(t*.7))+.012*np.sin(2*np.pi*base*2.01*t))*(.65+.35*np.sin(t*.35)**2)
        fx=np.zeros(len(t)); offset=0
        for i,b in enumerate(beats):
            n=min(sr//2,len(t)-offset); u=np.arange(n)/sr
            fx[offset:offset+n]+=(.035*rng.normal(0,1,n)+.09*np.sin(2*np.pi*(75*u-55*u*u)))*np.exp(-u*9)
            offset+=b['frames']*sr//30
        mix=voice+music+fx
        writewav(folder/'raw.wav',mix,sr)
        run('ffmpeg','-y','-v','error','-i',folder/'raw.wav','-af','loudnorm=I=-15:TP=-1.5:LRA=7','-ar','48000',folder/'mix.wav')
        (folder/'raw.wav').unlink()
    props={'episode':{**ep,'beats':beats,'audio':f"{ep['id']}/mix.wav"}}
    path=out/f"{ep['id']}.json"; path.write_text(json.dumps(props,ensure_ascii=False),encoding='utf8')
    return path
def qc(video,ep):
    d=json.loads(capture('ffprobe','-v','error','-show_streams','-show_format','-of','json',video))
    v=next(s for s in d['streams'] if s['codec_type']=='video'); a=next(s for s in d['streams'] if s['codec_type']=='audio')
    dur=float(d['format']['duration'])
    assert (v['width'],v['height'],v['avg_frame_rate'],v['codec_name'])==(1080,1920,'30/1','h264')
    assert a['codec_name']=='aac' and 22<=dur<=60
    run('ffmpeg','-v','error','-xerror','-i',video,'-f','null','-')
    log=subprocess.run(['ffmpeg','-hide_banner','-i',str(video),'-af','loudnorm=I=-15:TP=-1.5:LRA=7:print_format=json','-vn','-f','null','-'],capture_output=True,text=True,check=True).stderr
    m=re.findall(r'\{[^{}]*"input_i"[^{}]*\}',log,re.S)
    loud=json.loads(m[-1]); assert -18<=float(loud['input_i'])<=-12 and float(loud['input_tp'])<=0
    run('ffmpeg','-y','-v','error','-ss','2','-i',video,'-frames:v','1',P/'out'/f"{ep['id']}.jpg")
    report={'id':ep['id'],'duration':dur,'technical':'PASS','visual_review':'pending','loudness':loud}
    (P/'out'/f"{ep['id']}.qa.json").write_text(json.dumps(report,indent=2))
def main():
    eps=json.loads((P/'episodes.json').read_text(encoding='utf8'))
    ids=sys.argv[1:]
    for ep in eps:
        if ids and ep['id'] not in ids: continue
        props=prepare(ep); video=P/'out'/f"{ep['id']}.mp4"
        run('npx','--no-install','remotion','render','src.jsx','Episode',video,'--props='+str(props),'--codec=h264','--concurrency=2')
        qc(video,ep)
if __name__=='__main__': main()
