# NOIRSTEPS Admin

Tableau de bord d’administration pour la boutique NOIRSTEPS (commandes, produits, statistiques).

## Développement

```bash
npm install
npm run dev
```

Ouvre [http://localhost:8080](http://localhost:8080).

## Build

```bash
npm run build
```

Sortie dans `dist/`.

## Variables d’environnement

Crée un fichier `.env` à la racine du projet :

- `VITE_API_URL` : URL de l’API NOIRSTEPS (ex. `http://localhost:4000` en local, ou l’URL de ton API hébergée).

## Hébergement (Vercel / Netlify)

- **Build command** : `npm run build`
- **Output directory** : `dist`
- **Root directory** : si le dépôt contient un sous-dossier unique (ex. `solemate-admin-hub-main`), indique-le comme racine du projet dans les paramètres du site.
