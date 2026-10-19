# Fisica del volo

La teoria dietro il simulatore di volo **[Volo](https://massimilianopetra.github.io/flightsimulator/)**: forze aerodinamiche, atmosfera, prestazioni, elica, stabilità, corpo rigido a 6 gradi di libertà, integrazione numerica, radionavigazione e autopilota. Con le formule, i numeri del Cessna 172 del simulatore e le righe di codice che fanno ogni calcolo.

Pensato per gli **istituti tecnici** (in particolare l'indirizzo Trasporti e logistica – Costruzioni aeronautiche e Conduzione del mezzo aereo): bastano trigonometria, vettori e un'idea di derivata.

Un progetto di **Massimiliano Petra** — contatti: [massimiliano.petra@gmail.com](mailto:massimiliano.petra@gmail.com). Le scuole che vogliono usarlo in classe, segnalare errori o proporre miglioramenti possono scrivere a questo indirizzo.

## Contenuto

| Capitolo | Argomento | Laboratorio interattivo |
|---|---|---|
| 1 | Sistemi di riferimento e angoli | assetto, traiettoria e angolo d'attacco |
| 2 | L'atmosfera e le velocità | densità con la quota, velocità indicata e vera |
| 3 | Portanza e resistenza | curva di portanza, stallo, polare |
| 4 | Prestazioni: crociera, salita, virata, planata, vento | spinta e resistenza, rateo di salita, virata |
| 5 | Motore ed elica | spinta, giri, consumo, autonomia |
| 6 | Momenti e stabilità | elevatore di equilibrio, fugoide |
| 7 | Il corpo rigido a 6 gradi di libertà | effetto racchetta da tennis (equazioni di Eulero) |
| 8 | Integrazione numerica e carrello | atterraggio su una molla con metodi e passi diversi |
| 9 | Radionavigazione: VOR e ILS | dove sono sul sentiero di discesa? |
| 10 | Autopilota e controllo PID | tarare un anello di prua |
| App. | I numeri del Cessna 172 | tabelle lette dal file dei dati del simulatore |

## Come si apre

Basta aprire `index.html` con un doppio clic: non serve installare niente né essere collegati a Internet. Tutto è locale (formule con [KaTeX](https://katex.org/), caratteri B612).

## Struttura

```
index.html          pagina iniziale con l'elenco dei capitoli
capitoli/           un file HTML per capitolo
css/stile.css       aspetto delle pagine (tema chiaro e scuro, stampa)
js/comune.js        impaginazione, indice, formule, strumenti per i grafici dei laboratori
js/c172.js          copia del file dei dati dell'aereo del simulatore (dati/c172.js)
lib/katex/          KaTeX 0.16.11 (licenza MIT) per le formule
font/               caratteri B612 e B612 Mono (SIL Open Font License)
img/                immagini prese dal simulatore
```

## Licenze

- **Testi, figure, laboratori e codice di queste pagine**: © 2026 Massimiliano Petra, licenza [Creative Commons Attribuzione – Condividi allo stesso modo 4.0 Internazionale (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/deed.it) (testo completo in `LICENSE`). Si possono copiare, stampare, modificare e usare in classe, anche per lavori derivati, citando l'autore e mantenendo la stessa licenza.
- Gli estratti di codice del simulatore Volo riportati nei capitoli restano sotto la sua licenza, GPL-3.0-or-later; anche `js/c172.js` è una copia di un file del simulatore.
- KaTeX: licenza MIT (`lib/katex/LICENSE`).
- Caratteri B612: SIL Open Font License 1.1 (`font/OFL.txt`).
