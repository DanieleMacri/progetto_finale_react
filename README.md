# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




## Descrizione

* Il proget

## API

* https://rawg.io/
* Questo è il link dell' API usata nel progetto, utilizzata per ottenere informazioni sui videogiochi. Per archiviazione del database, autenticazione e chat in tempo reale abbiamo usato Supabase.

## Stile

* Ho utilizzato la libreria di Bootstrap per Navbar, Searchbar e Dropdown dei generi ovviamente poi modificandoli con il CSS. Le Card e i bottoni sono stati fatti interamente con il CSS. Ho implementato la libreira di React Bits da dove ho preso lo sfondo particellare della Homepage e l'animazione dell'immagine del videogioco nella Gamepage, modificandoli a mio piacimento. Le icone invece sono state prese da Fonteawesome.

## Pagine

* Rimpiazza con le pagine visitabili

1. Home page: si presenta con un bel effetto particellare e al di sotto abbiamo la lista di tutti i videogiochi.
2. Pagina dettaglio videogioco: visualizza tutte le informazioni del videogioco specifico tra cui: nome, immagine, descrizione e chat del gioco.
3. Pagina Registrazione utente: l'utente può registrarsi con: email, nome, cognome, username e password.
4. Pagina Profilo: l'utente registrato può modificare username, nome e cognome. può anche aggiungere un'immagine avatar che prima non era possibile inserire.
5. Pagina generi: in questa pagina saranno presenti solo i videogiochi del genere selezionato.
6. Pagina ricerca: in questa pagina saranno presenti solo i videogiochi con il nome scritto nella Searchbar.

## User Interactions

### Utente non autenticato:
1. può navigare tra i giochi in piattaforma
2. può filtrare per categoria i giochi
3. può cercare per nome i giochi
4. può registrarsi con email e password in piattaforma
5. può visitare i profili social presenti nel footer

### Utente autenticato:
5. può creare una lista di giochi favoriti
6. può chattare con altri utenti nella pagina del gioco selezionato
7. può modificare: nome, cognome, username e aggiungere un'immagine avatar nella sezione Profilo

## Context

* In questo progetto abbiamo utilizzato due Context Provider:
  1. Session Context, con cui abbiamo gestito l'utente loggato e non.
  2. Favorites Context, con cui abbiamo gestito la lista dei preferiti.

## Deployment

* Link: https://progetto-finale-react.vercel.app/
