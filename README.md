# NOIRSTEPS Admin Hub

Tableau de bord d’administration NOIRSTEPS. Le code de l’application est dans le sous-dossier **`solemate-admin-hub-main`**.

## Hébergement (Vercel)

1. Importe ce dépôt sur [Vercel](https://vercel.com).
2. Dans **Settings → General → Root Directory** : indique **`solemate-admin-hub-main`**.
3. **Build Command** : `npm run build`
4. **Output Directory** : `dist`
5. Variable d’environnement : `VITE_API_URL` = URL de ton API (ex. `https://ton-api.onrender.com`).

## Hébergement (Netlify)

Le fichier `solemate-admin-hub-main/netlify.toml` est configuré. Dans Netlify :

1. **Base directory** : `solemate-admin-hub-main`
2. **Build command** : `npm run build`
3. **Publish directory** : `solemate-admin-hub-main/dist`
4. Variable : `VITE_API_URL` = URL de ton API.

## Développement local

```bash
cd solemate-admin-hub-main
npm install
npm run dev
```
