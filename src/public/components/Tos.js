import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { SITE_DOT_COM, EMAIL_SUPPORT, getText } from '../../../Constants'


class About extends Component {
    constructor() {
        super()
    }

    sell = () => {
        document.location.href = "/sell"
    }

    shop = () => {
        this.props.history.push("/")
    }

    render() {
        return (
<div className="h-bg-grey h-pb-15">
 <div>
  <div firstLoad="true">
   <div className="b-tips__wrapper">
    <h1 className="b-tips__h1">
        <Link to="/" className="logo font-bask-normal">
            <img src={`${getText("LOGO_PATH")}`} width="45" alt="logo" className="d-inline-block align-middle mr-2"/>
        </Link>
        {getText("TOS")}
    </h1>
    
<div className="b-about-wrapper container">
 <div className="h-bg-white h-pv-15 h-ph-15">
     
 <h1>
{getText("RULES_OF_USE")}
</h1>
<p>
{"Se navighi o accedi in altro modo a qualsiasi contenuto o dato sul sito web cosmobox.it in cui i presenti Termini e condizioni compaiono a piè di pagina e a qualsiasi applicazione, servizio o strumento di cosmobox.it (collettivamente"}
 <b>
  "Risorsa"
 </b>
 o
 <b>
  "Servizio"
 </b>
 ) accetti di essere vincolato da questi termini. Se non accetti questi termini, ti preghiamo di non utilizzare questa risorsa.
</p>
<p>
 Utilizzando la Risorsa con o senza account registrato, indipendentemente da come la si accede o la si utilizza, anche tramite dispositivi mobili, si accettano i termini dei presenti Termini di condizioni e le linee guida pubblicate applicabili per il Servizio.
</p>
<p>
 I presenti Termini di Condizioni saranno un accordo legalmente vincolante tra l'Utente e l'Amministratore, il cui soggetto è una fornitura di accesso all'uso della Risorsa e alla sua funzionalità per l'Utente. Tra i presenti Termini di Condizioni, l'accordo tra l'Utente e l'Amministratore comprende anche tutti i documenti specifici, in base ai quali è regolata una fornitura di accesso all'uso della Risorsa, tra cui
 <Link to = "/ privacy"> Norme sulla privacy </Link>
 , e altri documenti che vengono sviluppati di volta in volta dall'amministratore.
</p>
<p>
 L'amministratore si riserva il diritto di modificare i termini e le condizioni in qualsiasi momento pubblicando i nuovi termini e condizioni sulla risorsa. Continuando a utilizzare il Servizio, accetti di essere vincolato dai Termini e condizioni modificati.
</p>
<p>
 <b>
  "Amministratore"
 </b>
 ,
 <b>
  "noi"
 </b>
 o
 <b>
  "noi"
 </b>
 - Amministratore del contenuto locale o altra entità che esercita il controllo sull'amministratore del contenuto locale, che fornisce i servizi agli utenti.
</p>
<p>
 <b>
  "Amministratore dei contenuti locali"
 </b>
{"- cosmobox.it"}
</p>
<p>
 <b>
  "Utente"
 </b>
 ,
 <b>
  "tu"
 </b>
 ,
 <b>
  "il tuo"
 </b>
 - indica qualsiasi persona fisica idonea a concludere un contratto ai sensi della legge applicabile con l'Amministratore e che utilizza uno qualsiasi dei Servizi con o senza un account registrato. Gli Utenti possono anche agire per conto della società che fornisce beni e servizi e che intende pubblicare annunci nella Risorsa. In questo caso, gli utenti avranno il potere di tale rappresentazione in forma scritta.
</p>
<p>
 <b>
  "Registrazione / account"
 </b>
 - un'area Utente elettronica all'interno del sistema funzionale della Risorsa, con l'ausilio della quale è in grado di gestire i propri annunci sulla Risorsa.
</p>
<h2>
 1. Disposizioni generali
</h2>
<p>
 1.1. Per la registrazione di un account, è necessario fornire le informazioni veridiche e aggiornate necessarie allo scopo di generare un account utente, che include il login univoco dell'utente (indirizzo e-mail) e una password per la risorsa, nonché il suo cognome e nome. Il modulo di registrazione delle risorse potrebbe richiedere all'utente di fornire informazioni più dettagliate.
</p>
<p>
 1.2. La risorsa è un mercato che consente agli utenti di offrire, vendere pubblicando un annuncio e acquistare praticamente qualsiasi cosa in una varietà di formati di prezzo e posizioni. Il contratto di vendita effettivo è direttamente tra gli Utenti. In tal modo l'Amministratore non è una parte della transazione, ma fornisce solo una piattaforma di scambio di comunicazione per la pubblicazione di annunci. Inoltre, non abbiamo alcun controllo e non garantiamo l'esistenza, la qualità, la sicurezza o la legalità degli articoli pubblicizzati ", la verità o l'accuratezza dei contenuti o degli elenchi degli utenti; la capacità dei venditori di vendere articoli; la capacità degli acquirenti di pagare gli articoli o che un acquirente o un venditore completerà effettivamente una transazione o restituirà un articolo.
</p>
<p>
 1.3. L'amministratore non persegue azioni incentrate sul controllo dei materiali pubblicati dagli utenti e declina espressamente ogni responsabilità in relazione ai materiali pubblicati dagli utenti.
</p>
<p>
 1.4. L'Amministratore previene la violazione del copyright e dei diritti di proprietà intellettuale durante l'utilizzo della Risorsa e può eliminare qualsiasi materiale dell'Utente, che viola i diritti di proprietà intellettuale, a propria discrezione senza preavviso. Potremmo anche interrompere l'accesso degli utenti alla risorsa, nel caso in cui tali utenti violino ripetutamente i diritti o commettano azioni in contrasto con i presenti Termini e condizioni.
</p>
<p>
 1.5. Possiamo impostare limiti di annunci attivi per colonne appropriate. L'amministratore delle risorse può fornire servizi aggiuntivi di aumento del limite di una colonna mediante la vendita di un pacchetto di annunci.
</p>
<p>
 1.6. Le tariffe che addebitiamo per l'utilizzo dei nostri Servizi sono elencate nella Risorsa.
</p>
<h2>
 2. Utilizzo della risorsa
</h2>
<h4>
 2.1. Utilizzando la risorsa, l'utente deve: "</h4>
<ul className = "h-ml-10" style = {{listStyleType: "none"}}>
 <li>
  2.1.1. fornire dati veritieri, completi e attuali durante la registrazione, assicurarne l'aggiornamento;
 </li>
 <li>
  2.1.2. L'Utente dovrà modificare immediatamente i dati per l'accesso alla Risorsa, qualora abbia il sospetto che il proprio indirizzo di posta elettronica e la password utilizzati per l'accesso alla Risorsa siano stati divulgati o probabilmente utilizzati da terzi.
 </li>
 <li>
  2.1.3. notificare all'amministratore l'accesso non autorizzato all'account personale e / o l'accesso non autorizzato e / o l'utilizzo del login e della password dell'utente;
 </li>
 <li>
  2.1.4. impedire ad altri Utenti l'accesso all'account personale oa qualsiasi informazione specifica in esso contenuta, se ciò può portare alla violazione delle leggi della Nigeria e / o dei presenti Termini e condizioni;
 </li>
 <li>
  2.1.5. evitare la pubblicazione di informazioni e oggetti (inclusi i riferimenti al presente documento) nella Risorsa, che può violare i diritti e gli interessi di altre persone;
 </li>
 <li>
  2.1.6. evitare la pubblicazione di informazioni e oggetti (inclusi i riferimenti al presente documento) alla Risorsa vietata dai presenti Termini e condizioni e dalla legge applicabile.
 </li>
</ul>
<h4>
 2.2. Utilizzando la risorsa, l'utente non deve: "</h4>
<ul className = "h-ml-10" style = {{listStyleType: "none"}}>
 <li>
  2.2.1. accedere come utente per conto o al posto di un'altra persona ("account falso"). Tuttavia, l'Utente può accedere in nome e per conto di un'altra persona fisica o giuridica previa ricezione delle necessarie autorità ben documentate
 </li>
 <li>
  2.2.2. confondere l'Utente riguardo alla sua personalità utilizzando login e password di qualsiasi altro Utente registrato;
 </li>
 <li>
  2.2.3. scaricare, archiviare, pubblicare, distribuire o fornire accesso illegalmente o in altro modo utilizzare la proprietà intellettuale degli utenti e di terzi;
 </li>
 <li>
  2.2.4. eseguire invii in blocco agli indirizzi di altri utenti risorsa senza il loro consenso;
 </li>
 <li>
  2.2.5. utilizzare software e perseguire ogni altra azione volta ad interferire con il normale funzionamento delle aree personali della Risorsa o degli Utenti;
 </li>
 <li>
  2.2.6. scaricare, archiviare, pubblicare, distribuire e fornire accesso o utilizzare in qualsiasi altro modo virus, li & gt; e altri malware;
 </li>
 <li>
  2.2.7. in qualsiasi modo, incluso, ma non limitato a, fraudolentemente, essere un mezzo di violazione della fede o crack, tentare di ottenere l'accesso al login e alla password di altri utenti;
 </li>
 <li>
  2.2.8. eseguire la raccolta e il trattamento illegali dei dati personali di altre persone
 </li>
 <li>
  2.2.9. utilizzare la Risorsa in altro modo ma come previsto nel presente documento, tranne quando tali azioni erano direttamente consentite all'Utente in base a un accordo separato con l'Amministratore;
 </li>
 <li>
  2.2.10. riprodurre, duplicare, copiare, vendere, effettuare transazioni commerciali e rivendere l'accesso all'utilizzo della Risorsa per qualsiasi scopo, tranne quando tali azioni fossero direttamente consentite all'Utente in base a un accordo separato con l'Amministratore;
 </li>
 <li>
  2.2.11. pubblicare qualsiasi altra informazione, che sia indesiderabile, in disaccordo con gli scopi della creazione della Risorsa, invadendo gli interessi degli Utenti o altrimenti si presenti come indesiderabile per essere pubblicata nella Risorsa;
 </li>
</ul>
<h4>
 2.3. Ciascun utente garantisce e riconosce che: "</h4>
<ul className = "h-ml-10" style = {{listStyleType: "none"}}>
 <li>
  2.3.1. si assume la piena responsabilità per l'ottenimento di tutti i permessi necessari in relazione a qualsiasi Contenuto utente, che rappresenta, scarica o visualizza;
 </li>
 <li>
  2.3.2. qualsiasi contenuto dell'Utente rappresentato, scaricato o visualizzato da lui / lei non viola alcun copyright, brevetto, diritto per marchi, nomi di società, segreti commerciali o altri diritti personali o proprietari di terze parti (
  <b>
   "Diritti di terze parti")
  </b>
  ; e
 </li>
 <li>
  2.3.3. ha il diritto e l'autorizzazione per la vendita, il commercio, la distribuzione o l'esportazione o per un'offerta di vendita, scambio, distribuzione o esportazione di prodotti e servizi descritti nel contenuto dell'utente e tale vendita, commercio, distribuzione o esportazione o offerta non non violare alcun diritto di terze parti.
 </li>
</ul>
<h2>
 3. Pubblicazione di annunci da parte dell'Utente
</h2>
<p>
 3.1. L'amministratore può richiedere all'Utente di fornire i documenti che confermano la legittimità della pubblicazione di annunci in relazione a beni e servizi.
</p>
<p>
 3.2. L'Utente, che pubblica annunci in merito alla vendita di beni e servizi alla Risorsa, inserirà informazioni su di essi in conformità con questi Termini e Condizioni e fornirà informazioni precise e complete sui beni e servizi, nonché sui termini e condizioni di vendita degli stessi. Quando l'Utente inserisce informazioni su beni o servizi, con la presente conferma di essere legalmente autorizzato a vendere tali beni o fornire tali servizi ai sensi delle leggi degli stati in cui vengono venduti, nonché di aver ottenuto tutte le approvazioni necessarie .
</p>
<p>
 3.3. L'Utente garantisce che i beni / servizi che offre corrispondono alle norme di qualità stabilite dalla legislazione degli stati in cui vengono venduti e sono liberi da pretese di terzi.
</p>
<p>
 3.4. L'Utente garantisce che i beni / servizi che offre a condizione che siano necessari permessi speciali per la vendita o la loro fornitura saranno venduti / resi in conformità con i requisiti degli stati, le cui autorità speciali avranno il potere di supervisionare l'attività di tale Utente.
</p>
<p>
 3.5. L'Utente deve controllare accuratamente tutte le informazioni su beni e servizi da lui inserite nella Risorsa e, in caso di rilevamento di informazioni errate, aggiungere i dati necessari nella descrizione dei prodotti o servizi. Se non esiste alcuna possibilità in tal senso, l'Utente dovrà modificare le informazioni errate annullando l'annuncio e pubblicando nuovamente informazioni su beni o servizi.
</p>
<p>
 3.6. Le condizioni di consegna dovrebbero essere incluse in una descrizione delle merci e i termini e le condizioni dei servizi dovrebbero far parte della descrizione del servizio. I termini e le condizioni di vendita e di servizio dei beni sviluppati dall'Utente non devono interferire con i presenti Termini e condizioni e con la legislazione applicabile degli stati per i quali vengono venduti.
</p>
<p>
 3.7. Il prezzo dei beni o dei servizi deve essere esatto. Se si ritiene che sia cambiato a causa di circostanze specifiche, i termini e le condizioni di modifica del prezzo devono essere forniti in un annuncio.
</p>
<p>
 3.8. L'utente non è autorizzato a pubblicare o distribuire: "</p>
<ul className = "h-ml-10" style = {{listStyleType: "none"}}>
 <li>
  - informazioni false, fuorvianti o ingannevoli;
 </li>
 <li>
  - informazioni poco raccomandabili, diffamatorie, minacciose o moleste, improprie, inaccettabili;
 </li>
 <li>
  - informazioni discriminatorie o informazioni che facilitano la discriminazione sulla base di razza, sesso, religione, nazionalità, invalidità, orientamento sessuale o età;
 </li>
 <li>
  - informazioni che violano il presente Regolamento;
 </li>
 <li>
  - informazioni che violano leggi e regolamenti applicabili (inclusi, senza limitazione, quelli che regolano il controllo delle esportazioni, la protezione dei consumatori, la concorrenza sleale o la falsa pubblicità, i diritti di proprietà intellettuale);
 </li>
 <li>
  - riferimenti diretti o indiretti a qualsiasi altro sito web, che comprende qualsiasi contenuto che possa violare il presente Regolamento;
 </li>
 <li>
  - linguaggio volgare offensivo;
 </li>
 <li>
  - difesa di odio, violenza, discriminazione, razzismo, xenofobia, conflitti etnici;
 </li>
 <li>
  - appelli alla violenza e alle azioni illegali;
 </li>
 <li>
  - dati che violano i diritti personali (non proprietari) e i diritti di proprietà intellettuale di terzi;
 </li>
 <li>
  - informazioni che facilitano la frode, l'inganno o la violazione della fede;
 </li>
 <li>
  - informazioni che portano a transazioni con oggetti rubati o contraffatti;
 </li>
 <li>
  - informazioni che violano o invadono la proprietà, il segreto commerciale o il diritto alla privacy di terzi;
 </li>
 <li>
  - informazioni personali o identificative di altre persone senza il loro consenso espresso;
 </li>
 <li>
  - informazioni comprendenti dati che possono violare il diritto alla privacy, abusare dell'onore, del merito o della reputazione aziendale di qualcuno;
 </li>
 <li>
  - informazioni comprendenti calunnie o minacce dirette contro chiunque;
 </li>
 <li>
  - informazioni di natura pornografica;
 </li>
 <li>
  - informazioni che possono arrecare danno a minorenni;
 </li>
 <li>
  - informazioni che portano a transazioni con qualsiasi apparecchiatura che possa ostacolare l'interoperabilità della rete;
 </li>
 <li>
  - informazioni false o fuorvianti;
 </li>
 <li>
  - virus o qualsiasi altra tecnica in grado di danneggiare la risorsa, l'amministratore o altri utenti;
 </li>
 <li>
  - informazioni su servizi ritenuti immorali, come la prostituzione o altre forme in contraddizione con norme morali o legali;
 </li>
 <li>
  - riferimenti o informazioni su siti web in concorrenza con i servizi di risorse;
 </li>
 <li>
  - informazioni che rappresentano "spam", "catene di Sant'Antonio", "schemi piramidali" o pubblicità commerciale indesiderabile o ingannevole;
 </li>
 <li>
  - informazioni distribuite dalle agenzie di informazione;
 </li>
 <li>
  - offerta di informazioni per guadagnare su Internet senza indicare l'indirizzo effettivo del datore di lavoro o contatti diretti;
 </li>
 <li>
  - informazioni di multistage e network marketing o qualsiasi altra attività che richieda il reclutamento di altri membri, subagenti, sub-distributori, ecc .;
 </li>
 <li>
  - informazioni di natura esclusivamente promozionale senza offerte di beni o servizi specifici;
 </li>
 <li>
  - informazioni o annunci su merci contraffatte, imitate o copie non autorizzate. Le copie non autorizzate includono anche beni che sono stati acquisiti con mezzi illegali, piratati o rubati. Tali merci possono violare i diritti di proprietà intellettuale e anche i diritti di marchio;
 </li>
 <li>
  - informazioni o annunci in vendita che possano altrimenti violare la legislazione dello Stato cui è destinato il presente bando.
 </li>
</ul>
<p>
</p>
<h2>
 4. Diritti di proprietà intellettuale
</h2>
<p>
 4.1. Se l'Utente pubblica contenuto legalmente posseduto nella Risorsa, concede ad altri utenti e all'Amministratore diritti non esclusivi per il suo utilizzo esclusivamente nell'ambito della funzionalità fornita dalla Risorsa, tranne quando tale uso danneggia o può danneggiare il diritto legalmente protetto interessi del titolare.
</p>
<p>
 4.2. L'Utente concede inoltre all'Amministratore un diritto non esclusivo di utilizzare il contenuto, che si trova sulla Risorsa e legalmente di sua proprietà, senza compenso, in modo che l'Amministratore possa garantire il funzionamento della Risorsa nella misura determinata da la sua funzionalità e architettura. Il suddetto diritto non esclusivo è previsto per il periodo di pubblicazione dei contenuti nella Risorsa che copre tutti gli stati del mondo. L'Amministratore ha il diritto di cedere i diritti descritti in questa clausola a terzi.
</p>
<p>
 4.3. È severamente vietato qualsiasi utilizzo della Risorsa o di qualsiasi contenuto della Risorsa, ad eccezione di quanto consentito dai presenti Termini e condizioni o in caso di consenso espresso del titolare del diritto a tale utilizzo, senza il previo consenso scritto del titolare del diritto.
</p>
<p>
 4.4. Responsabilità per violazione dei diritti esclusivi. L'Utente è l'unico responsabile per qualsiasi contenuto o altra informazione che scarica o in qualsiasi altro modo rende pubblicamente disponibile (post) sulla Risorsa, o tramite i suoi mezzi. L'Utente non scaricherà, distribuirà o pubblicherà contenuti sulla Risorsa se non è adeguatamente autorizzato a tale attività. In caso di accertamento di violazione dei diritti, si applicano le regole di presentazione della notifica di violazione dei diritti qui previste.
</p>
<p>
 4.5. L'Amministratore può, ma non deve, rivedere la Risorsa per la presenza di qualsiasi contenuto proibito e può eliminare o spostare (senza preavviso) qualsiasi contenuto a sua discrezione, per qualsiasi motivo o senza di esso, inclusi ma non limitati alla cancellazione o allo spostamento del contenuto che viola i presenti Termini e condizioni, leggi e / o può violare i diritti, infliggere danni o mettere in pericolo la sicurezza di altri Utenti o di terzi.
</p>
<p>
 4.6. Materiali sulla Risorsa, ad eccezione di quelli pubblicati dall'Utente, inclusi ma non limitati a testi, software, script, grafica, foto, suoni, musica, video, funzioni interattive, ecc. (
 <b>
  "Materiali"
 </b>
 ) e marchi, marchi di servizio e loghi inclusi in esso (
 <b>
  "Marks"
 </b>
 ) appartengono all'Amministratore che rappresentano elementi di copyright e di qualsiasi altro diritto di proprietà intellettuale. Non è consentito l'uso non autorizzato di tali Materiali e Marchi senza preavviso dell'Amministratore.
</p>
<h2>
 5. Avviso per reclami di violazioni della proprietà intellettuale e violazione del copyright
</h2>
<p>
 5.1. Se sei un titolare di diritti di proprietà intellettuale o una persona autorizzata ad agire in nome di un titolare di diritti di proprietà intellettuale e ritieni ragionevolmente che le informazioni pubblicate nella Risorsa in qualche modo violino i tuoi diritti di proprietà intellettuale o diritti di proprietà intellettuale di una persona , con il nome in cui agisci, puoi fornire una notifica all'amministratore che richiede di eliminare tale materiale. A questo proposito, garantirai che il tuo ricorso ha una base giuridica e agirai in buona fede secondo la legge.
</p>
<p>
 5.2. Fornendo notifiche pertinenti relative alla violazione dei diritti, assicurati che la tua richiesta corrisponda al modulo sottostante e includa quanto segue: "</p>
<ul className = "h-ml-10" style = {{listStyleType: "none"}}>
 <li>
  - un ricorso dovrebbe includere una firma fisica o elettronica di una persona abilitata ad agire in nome di un titolare di un diritto esclusivo, che si ritiene sia stato violato;
 </li>
 <li>
  - devono essere specificati gli elementi del diritto di proprietà intellettuale, i cui diritti sarebbero stati violati. Se esistono più elementi, deve essere fornito l'intero elenco di tali elementi;
 </li>
 <li>
  - devi specificare i materiali (con l'indicazione di specifiche pagine URL), che si afferma violino i diritti o siano essi stessi oggetto di violazione;
 </li>
 <li>
  - fornirai le informazioni di contatto in modo che l'Amministratore possa contattarti, ad esempio indirizzo, numero di telefono e indirizzo e-mail;
 </li>
 <li>
  - ha firmato la domanda in relazione alla tua fedele e ragionevole convinzione che il materiale oggetto di reclamo relativo alla violazione dei diritti di proprietà intellettuale venga utilizzato senza il consenso del titolare del diritto o del suo rappresentante e anche che ciò non è consentito dalla legge;
 </li>
 <li>
  - ha firmato la richiesta in relazione al fatto che un titolare di diritti di proprietà intellettuale solleva l'Amministratore da qualsiasi pretesa di terze parti relativa alla cancellazione di materiali pertinenti da parte dell'Amministratore;
 </li>
 <li>
  - ha firmato la domanda in merito alla correttezza delle informazioni contenute in una notifica sotto pena di spergiuro, e si è autorizzati ad agire in nome di un titolare di un diritto esclusivo, presumibilmente violato;
 </li>
 <li>
  - norme di legge indicate che ritieni siano state violate in relazione all'utilizzo di contenuti contestabili;
 </li>
 <li>
  - stato indicato, in quale territorio si ritiene siano stati violati i diritti;
 </li>
 <li>
  - copie di documenti che stabiliscono diritti per un oggetto del diritto di proprietà intellettuale, che è soggetto a sicurezza, nonché un documento che conferma i poteri per agire in nome del titolare, in allegato al suo ricorso.
 </li>
 <li>
{"- la notifica pertinente deve essere inviata all'indirizzo email " + EMAIL_SUPPORT + ""}
 </li>
</ul>
<p>
</p>
<h2>
 6. Politica antispam
</h2>
<p>
 Queste Regole proibiscono rigorosamente l'invio di messaggi pubblicitari indesiderati tramite e-mail, o di altri messaggi indesiderati o tramite la Risorsa. L'amministratore può controllare periodicamente la consegna delle lettere all'interno della Risorsa per i messaggi di spam.
</p>
<h2>
 7. Limitazione di responsabilità
</h2>
<p>
 7.1. TUTTI I SERVIZI FORNITI DALL'AMMINISTRATORE VENGONO FORNITI "COME SONO", "COME DISPONIBILI" E "CON TUTTI I DIFETTI", E L'AMMINISTRATORE NON RICONOSCE ALCUNA GARANZIA, ESPRESSA O IMPLICITA, INCLUSE, SENZA LIMITAZIONE, QUALSIASI GARANZIA RIGUARDANTE LE CONDIZIONI, LA QUALITÀ, LA DURATA DELLA VITA, PRECISIONE, AFFIDABILITÀ, VALORE COMMERCIALE E IDONEITÀ A SCOPI SPECIFICI. TUTTE TALI GARANZIE E RESPONSABILITÀ SONO QUI ESCLUSE.
</p>
<p>
 7.2. L'AMMINISTRATORE NON FORNISCE ALCUNA GARANZIA RIGUARDANTE L'AUTENTICITÀ, L'ACCURATEZZA, LA CORRETTEZZA, L'AFFIDABILITÀ, LA QUALITÀ, LA STABILITÀ, LA COMPLETEZZA O LA VALUTA DI QUALSIASI INFORMAZIONE FORNITA MEDIANTE LA RISORSA; L'AMMINISTRATORE NON FORNISCE ALCUNA GARANZIA RIGUARDANTE CHE LA PRODUZIONE, IMPORTAZIONE, ESPORTAZIONE, OFFERTA, VISUALIZZAZIONE, ACQUISTO, VENDITA E / O UTILIZZO DI PRODOTTI O SERVIZI, CHE SONO OFFERTI O VISUALIZZATI SULLA RISORSA NON VIOLANO I DIRITTI DI TERZI; E L'AMMINISTRATORE NON FORNISCE ALCUNA GARANZIA O DICHIARAZIONE DI QUALSIASI NATURA RIGUARDANTE QUALSIASI PRODOTTO O SERVIZIO OFFERTO O FORNITO SULLA RISORSA.
</p>
<p>
 7.3. Tutti i dati scaricati o in altro modo acquisiti tramite la Risorsa vengono creati a discrezione di ciascun Utente, e ciascun Utente sarà pienamente responsabile per eventuali danni inflitti al sistema informatico o perdita di dati, che possono derivare dal download di tali dati.
</p>
<p>
 7.4. L'Amministratore e le parti affiliate non si assumono alcuna responsabilità per i materiali pubblicati dagli Utenti, nonché per i beni e servizi offerti dall'Utente per il commercio. L'Amministratore declina ogni garanzia in merito alla qualità dei beni e dei servizi acquisiti tramite la Risorsa che sarà coerente con le aspettative e / o le richieste dell'acquirente. L'Amministratore non fornisce alcuna garanzia in merito al fatto che i beni, i servizi o le informazioni ordinati tramite la Risorsa saranno forniti dall'Utente della Risorsa in conformità con le aspettative dell'acquirente.
</p>
<h2>
 8. Indennità
</h2>
<p>
 8.1. Ogni Utente accetta di essere obbligato a risarcire l'Amministratore, le parti affiliate, i direttori, i funzionari e i dipendenti da qualsiasi perdita, reclamo, responsabilità (nonché dai costi legali nella misura massima), che possono sorgere a seguito dell'utilizzo del Risorsa, a seguito di violazione di qualsiasi condizione dei Termini e condizioni, o violazione di dichiarazioni e garanzie da lui rese nei confronti dell'Amministratore.
</p>
<p>
 8.2. Ogni Utente con la presente accetta di indennizzare l'Amministratore, le parti affiliate, i direttori, i funzionari e i dipendenti da qualsiasi e tutte le perdite, reclami, responsabilità, che possono sorgere, direttamente o indirettamente, come risultato di qualsiasi reclamo, avanzato dai titolari / ricorrenti del Diritti di terzi o di altre parti, relativi ai beni e servizi offerti o visualizzati sulla Risorsa. Ogni Utente con la presente riconosce che l'Amministratore non avrà alcuna responsabilità nei tuoi confronti in relazione ai dati pubblicati da altre persone, nonché a quelli discreditabili o illegali, e il rischio di perdite relative a tali dati rimane interamente a carico di ciascun Utente.
</p>
<p>
 8.3. L'Amministratore non sarà responsabile per eventuali, espresse o implicite, penalità, perdite accidentali o consequenziali o danni di qualsiasi natura (inclusi, ma non limitati a, perdite relative a mancato guadagno o risparmio, cessazione dell'attività, perdita di informazioni, perdita vantaggio), sostenute a seguito di transazioni, negligenza, delinquenza o in qualsiasi altro modo o qualsiasi altra perdita correlata alle seguenti azioni: "</p>
<ul className = "h-ml-10" style = {{listStyleType: "none"}}>
 <li>
  - utilizzo o impossibilità di utilizzo della Risorsa;
 </li>
 <li>
  - in caso di eventuali difetti di beni, modelli, dati, informazioni o servizi acquistati o altrimenti acquisiti dall'Utente o da qualsiasi altra parte tramite la Risorsa;
 </li>
 <li>
  - violazione dei diritti o delle rivendicazioni di terzi, o dei requisiti per la produzione, importazione, esportazione, distribuzione, offerta, visualizzazione, acquisizione, vendita e / o utilizzo dei prodotti o servizi dell'Utente, offerti o visualizzati sulla Risorsa, che potrebbero violare o può essere ritenuto violare i diritti di terzi; o una rivendicazione di qualsiasi parte relativa alla protezione dei diritti;
 </li>
 <li>
  - accesso non autorizzato di terzi ai dati o alle informazioni personali di qualsiasi Utente;
 </li>
 <li>
  - applicazioni o azioni di qualsiasi Resource User; o
 </li>
 <li>
  - anche altre azioni relative all'uso della Risorsa e derivanti da negligenza.
 </li>
</ul>
<p>
</p>
<h2>
 9. Applicazione
</h2>
<p>
 9.1. L'amministratore si riserva il diritto di eliminare o bloccare l'accesso alle informazioni pubblicate dall'Utente senza preavviso in caso di: "</p>
<ul className = "h-ml-10" style = {{listStyleType: "none"}}>
 <li>
  - ricezione di sentenze obbligatorie delle autorità pubbliche competenti;
 </li>
 <li>
  - rivendicazione di un titolare di diritti di proprietà intellettuale per porre fine alla violazione dei suoi diritti da parte di un utente sulla Risorsa; altre violazioni dei diritti o degli interessi legali di altri Utenti delle Risorse, di persone giuridiche o individui su loro ragionevole ricorso;
 </li>
 <li>
  - rilevamento di informazioni, la cui pubblicazione nella risorsa è vietata in base a queste regole.
 </li>
</ul>
<p>
</p>
<p>
 9.2. L'Amministratore ha il diritto di bloccare l'accesso alle informazioni pubblicate dagli utenti nella Risorsa a sua esclusiva discrezione, dopo aver fornito all'utente le prove pertinenti.
</p>
<h2>
 10. Interazione tra utenti e organizzazioni
</h2>
<p>
 10.1. L'Amministratore declina ogni responsabilità per l'interazione dell'Utente con organizzazioni e / o persone durante l'utilizzo della Risorsa. Ciò include, a titolo esemplificativo ma non esaustivo, pagamenti e consegna di beni e servizi, nonché qualsiasi altra interazione in relazione ad altre organizzazioni e / o individui. Le transazioni vengono concluse solo tra gli Utenti e tali organizzazioni e / o individui. L'Amministratore declina ogni responsabilità per tali interazioni o altre perdite subite a seguito di tali rapporti o interazioni. In caso di controversia tra te e uno o più altri utenti, dovrai indennizzare l'Amministratore, i suoi funzionari, dipendenti, agenti e successori da qualsiasi rivendicazione, richiesta e perdita (diretta o indiretta) di qualsiasi tipo o natura, che si presenti. o si riferiscono a tali controversie e / o beni e servizi.
</p>
<h2>
 12. Miscellanee
</h2>
<p>
{"12.1. Salvo quanto diversamente previsto, se una qualsiasi disposizione dei presenti Termini e condizioni è ritenuta non valida, nulla o per qualsiasi motivo inapplicabile, tale disposizione sarà cancellata e non pregiudicherà la validità e l'applicabilità delle restanti disposizioni. In a nostra esclusiva discrezione, possiamo assegnare i presenti Termini e condizioni e, in tal caso, pubblicheremo un avviso su cosmobox.it "}
</p>
<p>
 12.2. La nostra incapacità di agire rispetto a una violazione da parte tua o di altri non rinuncia al nostro diritto di agire in relazione a violazioni successive o simili. Non garantiamo che intraprenderemo azioni contro tutte le violazioni dei presenti Termini e condizioni.
</p>
<p>
 12.3. Le politiche pubblicate sui nostri siti possono essere modificate di volta in volta. Le modifiche hanno effetto quando vengono pubblicate nella risorsa.
</p>

 </div>
</div>
   </div>
  </div>
</div>
</div>
        )
    }
}

export default About