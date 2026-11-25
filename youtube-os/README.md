# YOUTUBE OS · INVERSE REALITY
Pipeline aislado del sitio público. Primer lote: cinco microficciones originales.
- Remotion 4.0.317 + Three.js (proyección 3D y SVG), 1080x1920/30 fps.
- Piper davefx (revisar MODEL_CARD: https://huggingface.co/rhasspy/piper-voices/blob/main/es/es_ES/davefx/medium/MODEL_CARD); música/efectos procedurales originales. FFmpeg únicamente audio y control técnico.
- El QA automático comprueba resolución, codec, duración, decodificación y sonoridad. No certifica calidad narrativa o visual; revisar los MP4 antes de autorizar cada ID.
- Revisar la licencia aplicable de Remotion al tamaño de la organización antes de uso comercial. No se integró todavía OpenMontage ni HyperFrames; son próximos adaptadores, no dependencias actuales.
- En GitHub Actions, renderizar con el workflow YOUTUBE OS. Los MP4, portadas y reportes se guardan como artefactos. No se publican automáticamente sin configuración.
- Para autorizar YouTube: activar YouTube Data API v3 en Google Cloud, crear cliente OAuth, conceder scope youtube.force-ssl en el canal correcto, obtener refresh token fuera del repositorio. Configurar GitHub Actions Secrets YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN; Variables YT_CHANNEL_ID, YT_APPROVED_IDS (IDs separados por coma: signal,memory,city,sun,eye), YT_PRIVACY (private por defecto), YT_UPLOAD_ENABLED=true. No pegar tokens en commits, issues o chat. 
- Subidas deduplicadas por identificador IR-ID en la descripción del canal. Mantener ese marcador. No repetir una subida si existe una respuesta incierta hasta revisar el canal.
- Configurar YT_UPLOAD_ENABLED solo después de revisar los renders. El modo manual puede ejecutar la subida; el horario diario queda condicionado a esa variable. No genera nuevas historias por sí mismo: añadir episodios y modificar el identificador de temporada de forma controlada.
