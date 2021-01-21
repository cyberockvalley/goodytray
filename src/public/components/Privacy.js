import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { SITE_NAME, SITE_DOT_COM, EMAIL_SUPPORT, getText } from '../../../Constants'


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
        politica sulla riservatezza
    </h1>
    
<div className="b-about-wrapper container">
 <div className="h-bg-white h-pv-15 h-ph-15">
  <h1 className="h-mt-0">
   {getText("PRIVACY_POLICY")}
  </h1>
  <p>
  La presente Informativa sulla privacy spiega quali dati personali vengono raccolti quando si utilizza cosmobox.it qualsiasi applicazione mobile cosmobox.it (
   <b>
    {"CosmoBox"}
   </b>
   ") E i servizi forniti attraverso di essa (insieme al"
   <b>
    Servizio
   </b>
   "), Come verranno utilizzati e condivisi tali dati personali.
  </p>
  <p>
   UTILIZZANDO IL SERVIZIO, CI PROMETTI DI (I) AVER LETTO, COMPRESO E ACCETTATO LA PRESENTE POLITICA SULLA PRIVACY E (II) HAI OLTRE 16 ANNI DI ETÀ (O HAI AVUTO IL TUO GENITORE O TUTORE LEGGERO E ACCETTATO LA PRESENTE POLITICA SULLA PRIVACY PER TE). Se non sei d'accordo o non sei in grado di fare questa promessa, non devi utilizzare il Servizio. In tal caso, è necessario contattare il team di supporto tramite chat online o e-mail per (a) richiedere la cancellazione del proprio account e dei dati.
  </p>
  <p>
   "
   <b>
    Processi
   </b>
   ", In relazione ai dati personali, include la raccolta, l'archiviazione e la divulgazione ad altri.
  </p>
  <h3>
   SOMMARIO
  </h3>
  <ul className = "h-ml-15 h-list-style-none">
   <li>
    <h4>
     <a href="#1">
      1. TITOLARE DEL TRATTAMENTO DEI DATI PERSONALI
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#2">
      2. CATEGORIE DI DATI PERSONALI CHE RACCOGLIAMO
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#3">
      3. PRINCIPI DI PROTEZIONE DEI DATI
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#4">
      4. PER QUALI FINALITÀ TRATTIAMO I DATI PERSONALI
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#5">
      5. SU QUALI BASI GIURIDICHE TRATTIAMO I SUOI ​​DATI PERSONALI
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#6">
      6. CON CHI CONDIVIDIAMO I TUOI DATI PERSONALI
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#7">
      7. COME PUOI ESERCITARE I TUOI DIRITTI SULLA PRIVACY
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#8">
      8. LIMITAZIONE DI ETÀ
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#9">
      9. MODIFICHE ALLA PRESENTE POLITICA SULLA PRIVACY
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#10">
      10. CONSERVAZIONE DEI DATI
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#11">
      11. CONTATTACI
     </a>
    </h4>
   </li>
  </ul>
  <h3 id = "1">
   1. TITOLARE DEL TRATTAMENTO DEI DATI PERSONALI
  </h3>
  <p>
{"cosmobox.it sarà il titolare del trattamento dei tuoi dati personali."}
  </p>
  <h3 id = "2">
   2. CATEGORIE DI DATI PERSONALI CHE RACCOGLIAMO
  </h3>
  <p>
   Raccogliamo i dati che ci fornisci volontariamente (ad esempio, un indirizzo email). Raccogliamo anche dati automaticamente (ad esempio, il tuo indirizzo IP).
  </p>
  <ol className = "h-ml-15">
   <li>
    <h5>
     Dati che ci fornisci
    </h5>
    <p>
     È possibile che ti venga chiesto di fornirci informazioni su di te quando ti registri e / o utilizzi il Servizio. Queste informazioni includono: "nome, numero di telefono, e-mail (insieme" Informazioni richieste "), cognome, foto, dettagli dell'indirizzo, orario di lavoro.
    </p>
    <p>
     Per utilizzare il nostro servizio e registrare un account, dovrai fornire le informazioni richieste. Sarai in grado di utilizzare il Servizio anche se non ci fornisci questi dati, ma alcune funzionalità del Servizio potrebbero essere limitate a te (ad esempio, se non registri un account, non sarai in grado di chattare con altri utenti , pubblicare annunci, vedere i dettagli di contatto di altri utenti).
    </p>
    <p>
     A volte potrebbe anche essere necessario fornirci ulteriori informazioni nella comunicazione con il nostro team di supporto al fine di soddisfare la tua richiesta (ad esempio, se il tuo account è stato precedentemente bloccato, potremmo chiederti di confermare la tua identità fornendo un documento di identità).
    </p>
   </li>
   <li>
    <h5>
     Dati forniti a noi da terze parti
    </h5>
    Quando decidi di accedere utilizzando Facebook o Google, otteniamo dati personali dal tuo account Facebook o Google. Ciò include la tua immagine del profilo, nome e ID Facebook, ID Google, elenco di amici. Per ulteriori informazioni, fare riferimento al Riferimento per le autorizzazioni di Facebook (descrive le categorie di informazioni che Facebook può condividere con terze parti e la serie di requisiti) e alla Politica sui dati di Facebook. Inoltre, Facebook ti consente di controllare le scelte che hai effettuato quando colleghi il tuo profilo Facebook all'App sulla loro pagina App e siti web. Per saperne di più su come Google tratta i tuoi dati, visita la sua Privacy Policy.
   </li>
   <li>
    <h5>
     Dati che raccogliamo automaticamente:
    </h5>
    <ul className = "h-ml-15">
     <li>
      <h5>
       Dati su come ci hai trovato
      </h5>
      Raccogliamo dati sul tuo URL di riferimento (ovvero il punto sul Web in cui ti trovavi quando hai toccato il nostro annuncio).
     </li>
     <li>
      <h5>
       Dati del dispositivo e della posizione.
      </h5>
      Raccogliamo dati dal tuo dispositivo. Esempi di tali dati includono impostazioni della lingua, indirizzo IP, fuso orario, tipo e modello di un dispositivo, impostazioni del dispositivo, sistema operativo, provider di servizi Internet, operatore di telefonia mobile, ID hardware e ID Facebook.
     </li>
     <li>
      <h5>
       Dati di utilizzo
      </h5>
      Registriamo come interagisci con il nostro servizio. Ad esempio, registriamo le funzionalità e il contenuto con cui interagisci, quanto spesso utilizzi il Servizio, quanto tempo sei sul Servizio, quali sezioni utilizzi, quanti annunci guardi.
     </li>
     <li>
      <h5>
       ID pubblicità
      </h5>
      Raccogliamo il tuo Apple Identifier for Advertising ("IDFA") o Google Advertising ID ("AAID") (a seconda del sistema operativo del tuo dispositivo). In genere puoi reimpostare questi numeri tramite le impostazioni del sistema operativo del tuo dispositivo (ma non lo controlliamo).
     </li>
     <li>
      <h5>
       Dati di transazione
      </h5>
      Quando effettui pagamenti tramite il Servizio, devi fornire i dati del conto finanziario, come il numero della tua carta di credito, ai nostri fornitori di servizi di terze parti. Non raccogliamo né memorizziamo i dati completi del numero di carta di credito, sebbene potremmo ricevere dati relativi alla carta di credito, dati sulla transazione, inclusi data, ora e importo della transazione, il tipo di metodo di pagamento utilizzato.
     </li>
     <li>
      <h5>
       Biscotti
      </h5>
      Un cookie è un piccolo file di testo che viene memorizzato sul computer di un utente per scopi di archiviazione. I cookie possono essere cookie di sessione o cookie persistenti. Un cookie di sessione scade quando chiudi il browser e viene utilizzato per semplificarti la navigazione nel nostro Servizio. Un cookie persistente rimane sul tuo disco rigido per un periodo di tempo prolungato. Utilizziamo anche pixel di tracciamento che impostano i cookie per assistere nella fornitura di pubblicità online. I cookie vengono utilizzati, in particolare, per riconoscerti automaticamente la prossima volta che visiti il ​​nostro sito web. Di conseguenza, le informazioni che hai inserito in precedenza in determinati campi del sito Web potrebbero apparire automaticamente la prossima volta che utilizzi il nostro servizio. I dati dei cookie verranno memorizzati sul tuo dispositivo e la maggior parte delle volte solo per un periodo di tempo limitato.
     </li>
    </ul>
   </li>
  </ol>
  <h3 id = "3">
   3. PRINCIPI DI PROTEZIONE DEI DATI
  </h3>
  <p>
   Nelle nostre pratiche di protezione dei dati ci sforziamo, in particolare, di fornire che i dati personali siano:
  </p>
  <ol className = "h-ml-15">
   <li>
    trattati in conformità a finalità specifiche, legittime e lecite da te autorizzate ",
   </li>
   <li>
    è adeguato, accurato e senza pregiudizio per la dignità di una persona umana;
   </li>
   <li>
    conservato solo per il periodo entro il quale è ragionevolmente necessario; e
   </li>
   <li>
    protetto contro pericoli e violazioni ragionevolmente prevedibili quali furto, attacco informatico, attacco virale, diffusione, manipolazioni di qualsiasi tipo, danni da pioggia, fuoco o esposizione ad altri elementi naturali.
   </li>
  </ol>
  <h3 id = "4">
   4. PER QUALI FINALITÀ TRATTIAMO I SUOI ​​DATI PERSONALI
  </h3>
  <p>
   Trattiamo i tuoi dati personali: "</p>
  <ol className = "h-ml-15">
   <li>
    <h5>
     Per fornire il nostro servizio
    </h5>
    Ciò include la possibilità di utilizzare il Servizio in modo trasparente e prevenire o risolvere errori del Servizio o problemi tecnici.
   </li>
   <li>
    <h5>
     Per personalizzare la tua esperienza
    </h5>
    Elaboriamo i tuoi dati personali per adattare il contenuto del Servizio e fare offerte su misura in base alle tue preferenze e interessi personali.
   </li>
   <li>
    <h5>
     Per gestire il tuo account e fornirti assistenza clienti
    </h5>
    Trattiamo i tuoi dati personali per rispondere alle tue richieste di supporto tecnico, informazioni sui servizi o qualsiasi altra comunicazione da te avviata. Ciò include l'accesso al tuo account per rispondere alle richieste di supporto tecnico. A tal fine, potremmo inviarti, ad esempio, notifiche o e-mail sulle prestazioni del nostro Servizio, sicurezza, transazioni di pagamento, avvisi riguardanti i nostri Termini e condizioni d'uso o la presente Informativa sulla privacy.
   </li>
   <li>
    <h5>
     Per comunicare con te in merito al tuo utilizzo del nostro Servizio
    </h5>
    <p>
{"Comunichiamo con te, ad esempio, tramite notifiche push o nella chat. Di conseguenza, potresti, ad esempio, ricevere una notifica sul sito web o tramite email che hai ricevuto un nuovo messaggio suCosmoBox Per disattivare la ricezione delle notifiche push, è necessario modificare le impostazioni del browser o del dispositivo mobile. Per disattivare determinati tipi di e-mail, è necessario seguire un collegamento di annullamento dell'iscrizione situato nel piè di pagina dell'e-mail contattando il nostro supporto team su "+ EMAIL_SUPPORT +" o nelle impostazioni del tuo profilo. "}
    </p>
    <p>
     I servizi che utilizziamo per questi scopi possono raccogliere dati riguardanti la data e l'ora in cui il messaggio è stato visualizzato dai nostri utenti, nonché quando hanno interagito con esso, ad esempio facendo clic sui collegamenti inclusi nel messaggio.
    </p>
   </li>
   <li>
    <h5>
     Per ricercare e analizzare l'utilizzo del Servizio
    </h5>
{"Questo ci aiuta a comprendere meglio la nostra attività, analizzare le nostre operazioni, mantenere, migliorare, innovare, pianificare, progettare e sviluppareCosmoBoxe i nostri nuovi prodotti. Utilizziamo tali dati anche per scopi di analisi statistica, per testare e migliorare le nostre offerte. Questo ci consente di capire meglio quali funzioni e sezioni di "+ SITE_NAME +" piacciono di più ai nostri utenti, quali categorie di utenti utilizzano il nostro Servizio. Di conseguenza, spesso decidiamo come migliorare "+ SITE_NAME +" in base a i risultati ottenuti da questa elaborazione. Ad esempio, se scopriamo che la sezione Lavori non è così popolare come le altre, potremmo concentrarci sul suo miglioramento. "}
   </li>
   <li>
    <h5>
     Per inviarti comunicazioni di marketing
    </h5>
    <p>
{"Elaboriamo i tuoi dati personali per le nostre campagne di marketing. Potremmo aggiungere il tuo indirizzo email al nostro elenco di marketing. Di conseguenza, riceverai informazioni sui nostri prodotti, come ad esempio offerte speciali e prodotti dei nostri partner. Se non desideri ricevere email di marketing da noi, puoi annullare l'iscrizione seguendo le istruzioni nel piè di pagina delle email di marketing, contattando il nostro team di supporto su "+ EMAIL_SUPPORT +" o nelle impostazioni del tuo profilo. "}
    </p>
    <p>
     Potremmo anche mostrarti annunci pubblicitari sul sito web e inviarti notifiche push per scopi di marketing. Per disattivare la ricezione delle notifiche push, è necessario modificare le impostazioni sul dispositivo o / e sul browser.
    </p>
   </li>
   <li>
   <h5>
     Per personalizzare i nostri annunci
    </h5>
    <p>
     Noi ei nostri partner utilizziamo i tuoi dati personali per personalizzare gli annunci e possibilmente anche per mostrarteli al momento opportuno. Ad esempio, se hai visitato il nostro sito Web, potresti vedere annunci dei nostri prodotti, ad esempio, nel feed di Facebook.
    </p>
    <p>
     Potremmo indirizzare la pubblicità all'utente attraverso una varietà di reti e scambi pubblicitari, utilizzando i dati delle tecnologie pubblicitarie all'interno e all'esterno dei nostri Servizi come cookie univoci o tecnologie di tracciamento simili, pixel, identificatori di dispositivi, geolocalizzazione, informazioni sul sistema operativo, e-mail.
    </p>
    <p>
     <b>
      Come rinunciare o influenzare la pubblicità personalizzata
     </b>
    </p>
    <p>
    </p>
    <h5>
     iOS:
    </h5>
    Sul tuo iPhone o iPad, vai su "Impostazioni", quindi "Privacy" e tocca "Pubblicità" per selezionare "Limita traccia annuncio". Inoltre, puoi reimpostare il tuo identificatore pubblicitario (questo potrebbe anche aiutarti a vedere meno annunci personalizzati) nella stessa sezione.
    <p>
    </p>
    <p>
    </p>
    <h5>
     Android:
    </h5>
    Per disattivare gli annunci su un dispositivo Android, è sufficiente aprire l'app Impostazioni Google sul telefono cellulare, toccare "Annunci" e abilitare "Disattiva annunci basati sugli interessi". Inoltre, puoi reimpostare il tuo identificatore pubblicitario nella stessa sezione (questo potrebbe anche aiutarti a vedere meno annunci personalizzati).
    <p>
    </p>
    <p>
     Per saperne di più su come influenzare le scelte pubblicitarie su vari dispositivi, guarda le informazioni disponibili
     <a href="http://www.networkadvertising.org/mobile-choice">
      Qui
     </a>
     .
    </p>
    <p>
     Inoltre, è possibile ottenere informazioni utili e disattivare la pubblicità basata sugli interessi visitando i seguenti collegamenti:
    </p>
    <ol className="h-ml-15">
    <li>
      Iniziativa per la pubblicità in rete -
      <a href="http://optout.networkadvertising.org/">
       http://optout.networkadvertising.org/
      </a>
     </li>
     <li>
      Digital Advertising Alliance -
      <a href="http://optout.aboutads.info/">
       http://optout.aboutads.info/
      </a>
     </li>
     <li>
      Digital Advertising Alliance (Canada) -
      <a href="http://youradchoices.ca/choices">
       http://youradchoices.ca/choices
      </a>
     </li>
     <li>
      Digital Advertising Alliance (UE) -
      <a href="http://www.youronlinechoices.com/">
       http://www.youronlinechoices.com/
      </a>
     </li>
     <li>
      Pagina DAA AppChoices -
      <a href="http://www.aboutads.info/appchoices">
       http://www.aboutads.info/appchoices
      </a>
     </li>
    </ol>
    <p>
    </p>
    <p>
    </p>
    <h5>
     Browser:
    </h5>
    <p>
     È anche possibile impedire al browser di accettare completamente i cookie modificando le impostazioni dei cookie del browser. Di solito puoi trovare queste impostazioni nel menu "Opzioni" o "Preferenze" del tuo browser. I seguenti link possono essere utili, oppure puoi usare l'opzione "Aiuto" nel tuo browser.
    </p>
    <ol className="h-ml-15">
    <li>
      Impostazioni dei cookie in Internet Explorer
     </li>
     <li>
      Impostazioni dei cookie in Firefox
     </li>
     <li>
      Impostazioni dei cookie in Chrome
     </li>
     <li>
      Impostazioni dei cookie in Safari web e iOS
     </li>
    </ol>
    <p>
    </p>
    <p>
     <b>
      Google
     </b>
     consente ai suoi utenti di <a href="https//adssettings.google.com/authenticated?hl=ru">
      disattivare gli annunci personalizzati di Google
     </a>
     e a <a href="https://tools.google.com/dlpage/gaoptout/">
      impedire che i loro dati vengano utilizzati da Google Analytics.
     </a>
    </p>
    <p>
    </p>
    <p>
     <b>
      Facebook
     </b> consente inoltre ai suoi utenti di influenzare i tipi di annunci che vedono su Facebook. Per scoprire come controllare gli annunci che vedi su Facebook, vai a <a href="https//www.facebook.com/help/146952742043748?helpref=related">
      Qui
     </a> o modifica le impostazioni degli annunci su <a href="https//www.facebook.com/ads/preferences/?entry_product=ad_settings_screen">
      Facebook
     </a>
    </p>
    <ol className = "h-ml-15">
     <li>
      <h5>
       Per far rispettare i nostri Termini e condizioni d'uso e per prevenire e combattere le frodi
      </h5>
      Utilizziamo i dati personali per far rispettare i nostri accordi e impegni contrattuali, per rilevare, prevenire e combattere le frodi. Come risultato di tale elaborazione, potremmo condividere le tue informazioni con altri, comprese le forze dell'ordine (in particolare, se sorge una controversia in relazione ai nostri Termini e condizioni d'uso).
     </li>
     <li>
      <h5>
       Per adempiere ad obblighi di legge
      </h5>
      Potremmo elaborare, utilizzare o condividere i tuoi dati quando la legge lo richiede, in particolare, se un'agenzia delle forze dell'ordine richiede i tuoi dati con i mezzi legali disponibili.
     </li>
     <li>
      <h5>
       Per elaborare i tuoi pagamenti
      </h5>
      Forniamo prodotti e / o servizi a pagamento all'interno del Servizio. A tal fine, utilizziamo servizi di terze parti per l'elaborazione dei pagamenti (ad esempio, processori di pagamento). Come risultato di questa elaborazione, sarai in grado di effettuare un pagamento e utilizzare le funzionalità a pagamento del Servizio.
     </li>
    </ol>
    <p>
    </p>
   </li>
  </ol>
  <h3 id = "5">
   5. SU QUALI BASI GIURIDICHE TRATTIAMO I SUOI ​​DATI PERSONALI
  </h3>
  <p>
   Trattiamo i tuoi dati personali, in particolare, secondo le seguenti basi giuridiche:
  </p>
  <ol className="h-ml-15">
  <li>
    il tuo consenso ",
   </li>
   <li>
    per eseguire il nostro contratto con te;
   </li>
   <li>
    <p>
    per i nostri legittimi interessi (o di altri); In base a questa base giuridica, in particolare: "
    </p>
    <ul className="h-ml-15">
    <li>
      <p>
       comunicare con te in merito al tuo utilizzo del nostro servizio
      </p>
      <p>
       Ciò include, ad esempio, l'invio di notifiche push che ti ricordano che hai messaggi non letti. L'interesse legittimo su cui facciamo affidamento per questo scopo è il nostro interesse per incoraggiarti a utilizzare il nostro servizio più spesso. Teniamo anche conto dei potenziali vantaggi per te.
      </p>
     </li>
     <li>
      <p>
       ricercare e analizzare l'utilizzo del Servizio
      </p>
      <p>
       Il nostro legittimo interesse per questo scopo è il nostro interesse a migliorare il nostro Servizio in modo da comprendere le preferenze degli utenti e essere in grado di fornirti un'esperienza migliore (ad esempio, per rendere l'uso della nostra applicazione mobile più facile e divertente, o per introdurre e testare nuove funzionalità).
      </p>
     </li>
     <li>
      <p>
       inviarti comunicazioni di marketing
      </p>
      <p>
       L'interesse legittimo su cui facciamo affidamento per questo trattamento è il nostro interesse a promuovere il nostro Servizio in modo misurato e appropriato.
      </p>
     </li>
     <li>
      <p>
       personalizzare i nostri annunci
      </p>
      <p>
       L'interesse legittimo su cui facciamo affidamento per questo trattamento è il nostro interesse a promuovere il nostro Servizio in modo ragionevolmente mirato.
      </p>
     </li>
     <li>
      <p>
       applicare i nostri Termini e condizioni d'uso e per prevenire e combattere le frodi
      </p>
      <p>
       I nostri interessi legittimi per questo scopo sono far valere i nostri diritti legali, prevenire e affrontare le frodi e l'uso non autorizzato del Servizio, il mancato rispetto dei nostri Termini e condizioni d'uso.
      </p>
     </li>
     <li>
      <p>
       per adempiere ad obblighi di legge.
      </p>
     </li>
    </ul>
   </li>
  </ol>
  <h3 id = "6">
   6. CON CHI CONDIVIDIAMO I TUOI DATI PERSONALI
  </h3>
  <p>
   Condividiamo informazioni con terze parti che ci aiutano a gestire, fornire, migliorare, integrare, personalizzare, supportare e commercializzare il nostro Servizio. Potremmo condividere alcuni set di dati personali, in particolare, per le finalità e con le parti indicate nella Sezione 2 della presente Informativa sulla privacy. I tipi di terze parti con cui condividiamo le informazioni includono, in particolare:
  </p>
  <ol className="h-ml-15">
  <li>
    <h5>
     Fornitori di servizi
    </h5>
    <p>
     Condividiamo i dati personali con terze parti che assumiamo per fornire servizi o svolgere funzioni aziendali per nostro conto, in base alle nostre istruzioni. Potremmo condividere le tue informazioni personali con i seguenti tipi di fornitori di servizi:
    </p>
    <ul className = "h-ml-15">
     <li>
      fornitori di cloud storage (Amazon, DigitalOcean, Hetzner)
     </li>
     <li>
      fornitori di analisi dei dati (Facebook, Google, Appsflyer)
     </li>
     <li>
      partner di marketing (in particolare, reti di social media, agenzie di marketing, servizi di consegna di posta elettronica ", come Facebook, Google, Mailfire)
     </li>
    </ul>
   </li>
   <li>
    <h5>
     Forze dell'ordine e altre autorità pubbliche
    </h5>
    <p>
     Possiamo utilizzare e divulgare i dati personali per far rispettare i nostri Termini e condizioni d'uso, per proteggere i nostri diritti, privacy, sicurezza o proprietà e / o quelli dei nostri affiliati, voi o altri, e per rispondere alle richieste dei tribunali, delle forze dell'ordine agenzie, agenzie di regolamentazione e altre autorità pubbliche e governative o in altri casi previsti dalla legge.
    </p>
   </li>
   <li>
    <h5>
     Terze parti nell'ambito di una fusione o acquisizione
    </h5>
    <p>
     Man mano che sviluppiamo la nostra attività, possiamo acquistare o vendere beni o offerte commerciali. Le informazioni dei clienti sono generalmente una delle risorse aziendali trasferite in questi tipi di transazioni. Potremmo anche condividere tali informazioni con qualsiasi entità affiliata (ad es. Società madre o sussidiaria) e possiamo trasferire tali informazioni nel corso di una transazione aziendale, come la vendita della nostra attività, una cessione, fusione, consolidamento o vendita di attività, o nell'improbabile caso di fallimento.
    </p>
   </li>
  </ol>
  <h3 id = "7">
   7. COME PUOI ESERCITARE I TUOI DIRITTI SULLA PRIVACY
  </h3>
  <p>
   Per avere il controllo dei tuoi dati personali, hai i seguenti diritti: "</p>
  <p>
   <b>
    Accesso / revisione / aggiornamento / correzione dei dati personali.
   </b>
{"   Puoi rivedere, modificare o cambiare i dati personali che avevi precedentemente fornito a CosmoBox nella sezione delle impostazioni del sito web."}
  </p>
  <p>
{"   Puoi anche richiedere una copia dei tuoi dati personali raccolti durante l'utilizzo del Servizio su "+ EMAIL_SUPPORT +". "}
  </p>
  <p>
   <b>
    Cancellazione dei tuoi dati personali.
   </b>
{"Puoi richiedere la cancellazione dei tuoi dati personali inviandoci un'email a " + EMAIL_SUPPORT + "."}
  </p>
  <p>
   Quando richiedi la cancellazione dei tuoi dati personali, faremo ogni ragionevole sforzo per onorare la tua richiesta. In alcuni casi potremmo essere legalmente obbligati a conservare alcuni dati per un certo tempo ", in tal caso, adempiremo alla tua richiesta dopo aver adempiuto ai nostri obblighi.
  </p>
  <p>
   <b>
    Opporsi o limitare l'uso dei tuoi dati personali (anche per scopi di marketing diretto).
   </b>
{"Puoi chiederci di interrompere l'utilizzo di tutti o alcuni dei tuoi dati personali o di limitarne l'utilizzo inviando una richiesta a " + EMAIL_SUPPORT + "."}
  </p>
  <p>
   <b>
    Il diritto di proporre reclamo all'autorità di controllo.
   </b>
   Ci piacerebbe che ci contattassi direttamente, così potremmo rispondere alle tue preoccupazioni. Tuttavia, hai il diritto di proporre reclamo a un'autorità di controllo della protezione dei dati competente.
  </p>
  <h3 id = "8">
   8. LIMITAZIONE DI ETÀ
  </h3>
  <p>
{"Non elaboriamo consapevolmente dati personali di persone di età inferiore a 16 anni. Se apprendi che qualcuno di età inferiore a 16 anni ci ha fornito dati personali, ti preghiamo di contattarci all'indirizzo " + EMAIL_SUPPORT + "."}
  </p>
  <h3 id = "9">
   9. MODIFICHE ALLA PRESENTE POLITICA SULLA PRIVACY
  </h3>
  <p>
   Di tanto in tanto potremmo modificare la presente Informativa sulla privacy. Se decidiamo di apportare modifiche sostanziali alla presente Informativa sulla privacy, sarai informato tramite il nostro Servizio o con altri mezzi disponibili e avrai l'opportunità di rivedere l'Informativa sulla privacy rivista. Continuando ad accedere o utilizzare il Servizio dopo che tali modifiche diventano effettive, accetti di essere vincolato dall'Informativa sulla privacy rivista.
  </p>
  <h3 id = "10">
   10. CONSERVAZIONE DEI DATI
  </h3>
  <p>
{"Conserveremo i tuoi dati personali per tutto il tempo ragionevolmente necessario per il raggiungimento degli scopi stabiliti nella presente Informativa sulla privacy (inclusa la fornitura del Servizio all'utente), che include (ma non è limitato a) il periodo durante il quale hai un account CosmoBox. Conserveremo e utilizzeremo i tuoi dati personali anche se necessario per ottemperare ai nostri obblighi legali, risolvere controversie e far rispettare i nostri accordi. "}
  </p>
  <h3 id = "11">
   11.CONTATTACI
  </h3>
  <p>
{"Puoi contattarci in qualsiasi momento per i dettagli relativi alla presente Informativa sulla privacy e alle sue versioni precedenti. Per qualsiasi domanda relativa al tuo account o ai tuoi dati personali, contattaci all'indirizzo " + EMAIL_SUPPORT + "."}
  </p>
  <p>
   In vigore da gennaio 2020
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