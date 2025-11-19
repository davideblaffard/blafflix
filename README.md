# Blafflix 🎬

Blafflix è un **clone in stile Netflix** pensato per il portfolio, realizzato con **Next.js (App Router), React, TypeScript e Tailwind CSS**.

L'app è completamente **client-side friendly**, usa **dati mock** locali (nessuna chiamata API esterna obbligatoria) e una **finta autenticazione** basata su `localStorage`.

---

## Stack tecnico

- **Next.js** (App Router, `app/`)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Zustand** per la gestione dello stato (auth, lista, search)
- Dati mock locali in `src/lib/movies.ts`

---

## Funzionalità

- **Home page** in stile Netflix
  - Hero con contenuto in evidenza
  - Liste a carosello: *In evidenza*, *Originals*, *Più votati*, *Tutti i contenuti*
- **Pagina di dettaglio** `/title/[id]`
  - Info complete sul contenuto (anno, rating, tipo, ecc.)
  - Sezione *Contenuti simili*
- **Autenticazione mock**
  - Pagine `/login` e `/register`
  - Finto login/registrazione con dati salvati in `localStorage`
  - Nome utente mostrato nella navbar
- **La mia lista**
  - Pagina `/my-list`
  - Aggiunta/rimozione contenuti dalla lista
  - Persistenza in `localStorage`
- **Ricerca**
  - Barra di ricerca globale nella navbar
  - Risultati su `/search`
- **UI/UX**
  - Tema scuro in stile Netflix
  - Navbar fissa con logo, link e campo ricerca
  - Footer con link fittizi
  - Design responsive (mobile, tablet, desktop)
  - Loading, empty states, error state di base

---

## Requisiti

- Node.js LTS (>= 18 consigliato)
- npm, pnpm o yarn

---

## Installazione

Clona il repository:

```bash
git clone https://github.com/<tu-username>/blafflix.git
cd blafflix
