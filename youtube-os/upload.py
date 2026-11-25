"""Upload reviewed renders, with channel identity and duplicate checks. Never log credentials."""
import os,json,pathlib
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
P=pathlib.Path(__file__).resolve().parent
scope=['https://www.googleapis.com/auth/youtube.force-ssl']
def main():
    required=['YT_CLIENT_ID','YT_CLIENT_SECRET','YT_REFRESH_TOKEN','YT_CHANNEL_ID']
    if any(not os.environ.get(k) for k in required): raise SystemExit('OAuth or expected channel missing; upload blocked.')
    creds=Credentials(None,refresh_token=os.environ['YT_REFRESH_TOKEN'],token_uri='https://oauth2.googleapis.com/token',client_id=os.environ['YT_CLIENT_ID'],client_secret=os.environ['YT_CLIENT_SECRET'],scopes=scope)
    creds.refresh(Request())
    yt=build('youtube','v3',credentials=creds,cache_discovery=False)
    channels=yt.channels().list(part='id,contentDetails',mine=True).execute()['items']
    if len(channels)!=1 or channels[0]['id']!=os.environ['YT_CHANNEL_ID']: raise SystemExit('Unexpected YouTube channel; upload blocked.')
    playlist=channels[0]['contentDetails']['relatedPlaylists']['uploads']
    seen=set(); token=None
    while True:
        res=yt.playlistItems().list(part='contentDetails',playlistId=playlist,maxResults=50,pageToken=token).execute()
        ids=[x['contentDetails']['videoId'] for x in res['items']]
        if ids:
            items=yt.videos().list(part='snippet',id=','.join(ids)).execute()['items']
            for x in items:
                for line in x['snippet']['description'].splitlines():
                    if line.startswith('IR-ID: '): seen.add(line[7:])
        token=res.get('nextPageToken')
        if not token: break
    privacy=os.environ.get('YT_PRIVACY','private')
    if privacy not in ('private','unlisted','public'): raise SystemExit('Invalid privacy')
    approved=set(os.environ.get('YT_APPROVED_IDS','').split(','))
    receipts=[]
    for ep in json.loads((P/'episodes.json').read_text()):
        id=ep['id']; marker='s01-'+id
        if marker in seen or id not in approved: continue
        qa=P/'out'/f'{id}.qa.json'; video=P/'out'/f'{id}.mp4'
        if not qa.exists() or not video.exists(): continue
        if json.loads(qa.read_text())['technical']!='PASS': continue
        body={'snippet':{'title':ep['title']+' | INVERSE REALITY #Shorts','description':ep['description']+'\nIR-ID: '+marker,'categoryId':'24','defaultLanguage':'es'},'status':{'privacyStatus':privacy,'selfDeclaredMadeForKids':False}}
        r=yt.videos().insert(part='snippet,status',body=body,media_body=MediaFileUpload(str(video),mimetype='video/mp4',resumable=True)).execute()
        receipts.append({'episode':id,'video_id':r['id'],'privacy':r['status']['privacyStatus']})
        (P/'out'/'youtube-receipts.json').write_text(json.dumps(receipts,indent=2))
        seen.add(marker); print('Uploaded:',id,r['id'],r['status']['privacyStatus'])
if __name__=='__main__': main()
