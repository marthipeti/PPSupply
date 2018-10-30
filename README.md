![PPS logo](/images/logo-text-black-mini.png)

A PaperSupply egy olyan alkalmazás, amin keresztül papír-írószer, valamint csomagolóanyagokat rendelhetünk.

# Projektötlet

## Funkcionális követelmények

#### Vendégként:
- hozzáférhetünk a termékek listájához → *Termékek* *listázása*
- regisztrálhatunk → *Regisztráció*

#### Felhasználóként:
- hozzáférhetünk a termékek listájához → *Termékek* *listázása*
- rendelést adhatunk le a készleten lévő termékekre → *Rendelés* *leadása*
- módosíthatjuk profilunk adatait → *Profil* *szerkesztése*
- listázhatjuk korábbi rendeléseinket → *Rendelések* *listázása*
- törölhetjük a profilunkat → *Profil* *törlése*

#### Adminisztrátorként:
- hozzáférhetünk a termékek listájához → *Termékek* *listázása*
- vehetünk fel új terméket → *Termék* *felvétele*
- törölhetünk terméket → *Termék* *törlése*
- rendelhetünk terméket a beszállítóktól, a készletek feltöltésére →  *Termékek* *rendelése*
- hozzáférhetünk felhasználók listájához → *Felhasználók* *listázása*
- törölhetünk felhasználót → *Felhasználó* *törlése*
- listázhatjuk a rendeléseket → *Rendelések* *listázása*
- teljesíthetünk rendeléseket → *Rendelés* *lezárása*
- törölhetünk rendelést → *Rendelés* *törlése*

## Szerepkörök:
- **vendég:** Felhasználói profil nélkül böngészhet a termékek között, de nem rendelhet
- **felhasználó:** Regisztráció után rendelhet
- **adminisztrátor:** Kezeli a rendeléseket,felhasználókat. Szerkeszti a termékek adatbázisát. Rendelés beszállítóktól a készletek feltöltése végett.

## Nem funkcionális követelmények
- Felhasználóbarát
- Ergonomikus elrendezés és kinézet
- Intuitív
- Gyors működés
- Biztonságos működés: jelszavak tárolása, funkciókhoz való hozzáférés

## Autentikáció, autorizáció és endpointok
Az alkalmazás három szerepkört különböztet meg, akiknek más és más hozzáférései vannak az adatbázishoz. Bizonyos oldalak több hozzáférést és műveletet (GET, POST , PUT, DELETE) engednek meg szinte az összes felhasználónak, de vannak olyan információk, amiket csak az adminisztrátor tud lekérdezni.

## Táblák
-	Felhasználók táblája
-	Termékek táblája
-	Rendelések táblája
-	Beszállító cégek táblája
![PPS tables](/images/tables.png)

*A lekérdézéseknél az „ID” kifejezést használjuk az adott sorra*

### Felhasználók táblája
- 	Vendég: nincs hozzáférés
-	Felhasználó: 
	- `GET/POST/PUT/DELETE api/users/{id}` csak saját ID
-	Adminisztrátor:	
	- `GET/POST/PUT/DELETE api/users, api/users/{id}` összes ID

### Termékek táblája
-	Vendég: GET: összes ID (api/products, api/products/{id})
-	Felhasználó:GET: összes ID (api/products, api/products/{id})
-	Adminisztrátor:GET, POST, PUT, DELETE:  összes ID (api/products, api/products/{id}

### Rendelések táblája
-	Vendég: nincs hozzáférése
-	Felhasználó:	GET, POST, PUT, DELETE: csak saját ID (api/orders/{userid}
-	Adminisztrátor:	GET, POST, PUT, DELETE:  összes ID (api/orders/{id},  api/orders/{userdid})

### Beszállító cégek
-	Vendégnek és felhasználónak nincs hozzáférése
-	Adminisztrátor:	GET, POST, PUT, DELETE:  összes ID (api/suppliers/{id})

## Felhasználói felület tervek
[PPS admin UI](/images/admin.png)
[PPS kosár UI](/images/kosar.png)
[PPS profil UI](/images/profil.png)
[PPS termékek UI](/images/termekek.png)
##

![PPS logo m](/images/logo-mini.png)

# Backend megvalósítása
