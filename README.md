# Recepten App
 
## Inhoudsopgave
1. [Inleiding](#inleiding)
2. [Screenshot](#screenshot)
3. [Benodigdheden](#benodigdheden)
4. [De applicatie draaien](#de-applicatie-draaien)
5. [Overige commando's](#overige-commandos)
6. [Testgebruikers](#testgebruikers)
 
## Inleiding
De Recepten App is een moderne webapplicatie ontwikkeld met React, die gebruikers in staat stelt om recepten te ontdekken, zoeken en beheren. De applicatie is gebouwd met een focus op gebruiksgemak en biedt een intuïtieve interface voor het verkennen van internationale gerechten. Met behulp van TheMealDB API voor de receptendata en de NOVI Educational Backend voor gebruikersauthenticatie, kunnen gebruikers hun favoriete recepten opslaan en beheren.
 
De applicatie biedt de volgende kernfunctionaliteiten:
- Uitgebreid zoeken en filteren van recepten op ingrediënten, categorieën en keukens
- Gedetailleerde receptinformatie met ingrediënten en bereidingswijze
- Persoonlijk account met mogelijkheid tot opslaan van favoriete recepten
- Responsive design voor optimaal gebruik op alle apparaten
 
## Screenshot
![Screenshot van de homepagina](/public/home.png)
*De homepagina toont een overzicht van beschikbare recepten met zoek- en filterfunctionaliteit*
 
 
## Benodigdheden
 
### Software Vereisten
- Node.js (versie 18 of hoger)
- npm (komt standaard met Node.js)
- Git (voor het clonen van de repository)
- Een moderne webbrowser (Chrome, Firefox, Safari, Edge)
 
### API's
De applicatie maakt gebruik van:
1. **TheMealDB API**
   - Gratis versie beschikbaar voor ontwikkeling
   - Geen API key vereist voor basisfunctionaliteit
   - Rate limit: 100 requests per uur
 
2. **NOVI Educational Backend**
   - Verzorgt gebruikersauthenticatie en accountbeheer
   - Base URL: https://api.datavortex.nl/daanreceptje
 
## De applicatie draaien
 
### Stap 1: Repository clonen
```bash
git clone [repository-url]
cd Frontend_Eindopdracht
```
 
### Stap 2: Dependencies installeren
```bash
npm install
```
 
### Stap 3: Development server starten
```bash
npm run dev
```
 
### Stap 4: Applicatie openen
Open je browser en navigeer naar:
```
http://localhost:5173
```
 
## Overige commando's
 
| Commando | Beschrijving |
|----------|--------------|
| `npm run build` | Bouwt de applicatie voor productie in de `dist` map |
| `npm run lint` | Voert ESLint uit om de code te controleren op fouten |
| `npm run preview` | Start een lokale server om de gebouwde productieversie te bekijken |
 
## Testgebruikers
 
### Nieuw Account Aanmaken
Je kunt ook een nieuw account registreren met de volgende vereisten:
- Gebruikersnaam: minimaal 6 karakters
- Wachtwoord: minimaal 6 karakters, inclusief een hoofdletter en een speciaal teken
- Geldig email adres
 
### Troubleshooting
Mocht je problemen ondervinden bij het inloggen:
1. Clear je browser cache en local storage
2. Controleer of je de juiste inloggegevens gebruikt
3. Probeer de pagina te verversen
4. Controleer of de NOVI backend bereikbaar is
#
