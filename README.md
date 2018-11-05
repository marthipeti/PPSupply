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
- termékhez köthetük tag-et → *Tag* *hozzáadása*
- hozzáadhatunk tag-et a listához → *Tag* *létrehozása*
- törölhetünk tag-et → *Tag* *törlése*
- módosíthatunk tag-et → *Tag* *módosítása*

## Szerepkörök:
- **vendég:** Felhasználói profil nélkül böngészhet a termékek között, de nem rendelhet
- **felhasználó:** Regisztráció után rendelhet
- **adminisztrátor:** Kezeli a rendeléseket,felhasználókat. Szerkeszti a termékek adatbázisát. Termékekre tag-eket rakhat pl. írószer, papír, színes, akciós stb.

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
-	Termék tag-ek táblája

### Felhasználók táblája
- 	Vendég: 

	nincs hozzáférés
-	Felhasználó: 

	GET, POST, PUT, DELETE: csak saját ID (api/users/{id}) 
-	Adminisztrátor:	

	GET, POST, PUT, DELETE: összes ID (api/users, api/users/{id}): 

### Termékek táblája
-	Vendég: 

	GET: összes ID (api/products, api/products/{id})
-	Felhasználó:

	GET: összes ID (api/products, api/products/{id})
-	Adminisztrátor:

	GET, POST, PUT, DELETE:  összes ID (api/products, api/products/{id})

### Rendelések táblája
-	Vendég: 

	nincs hozzáférése
-	Felhasználó:

	GET, POST, PUT, DELETE: csak saját ID (api/orders/{userid}
-	Adminisztrátor:	

	GET, POST, PUT, DELETE:  összes ID (api/orders/{id},  api/orders/{userdid})

### Termék tag-ek táblája
-	Vendégnek és felhasználónak nincs hozzáférése
-	Adminisztrátor:	GET, POST, PUT, DELETE:  összes ID (api/tags/{id})

## Felhasználói felület tervek
![PPS admin UI](/images/admin.png)

![PPS kosár UI](/images/kosar.png)

![PPS profil UI](/images/profil.png)

![PPS termékek UI](/images/termekek.png)
##

![PPS logo m](/images/logo-mini.png)

# Backend

## Fejlesztői környezet, használt technológiák
- NetBeans IDE 8.2
- HTTP, JSON, REST API (Spring boot, Issue tracker)
- HTML, CCS, Typescript, git, Angular

## Adatbázis UML diagram
![DB UML](/images/db_uml.PNG)

## Végpontok
### Product
   #### /api/products
   GET : Minden termék listázása
   POST : Új termék beszúrása (ADMIN)
   #### /api/products/{id}
   GET : Adott {id}-ű termék listázása
   DELETE : Adott {id}-ű termék törlése (ADMIN)
   PUT : Adott {id}-ű termék módosítása (ADMIN)
   #### /api/products/{id}/reservations
   GET : Adott {id}-ű termék rendelésekben való előfordulásának listázása (ADMIN)
### Reservation
   #### /api/products
   GET : Minden termék listázása
   POST : Új termék beszúrása (ADMIN)
   #### /api/products/{id}
   GET : Adott {id}-ű termék listázása
   DELETE : Adott {id}-ű termék törlése (ADMIN)
   PUT : Adott {id}-ű termék módosítása (ADMIN)
   #### /api/products/{id}/reservations
   GET : Adott {id}-ű termék rendelésekben való előfordulásának listázása (ADMIN)
### Tag
   #### /api/products
   GET : Minden termék listázása
   POST : Új termék beszúrása (ADMIN)
   #### /api/products/{id}
   GET : Adott {id}-ű termék listázása
   DELETE : Adott {id}-ű termék törlése (ADMIN)
   PUT : Adott {id}-ű termék módosítása (ADMIN)
   #### /api/products/{id}/reservations
   GET : Adott {id}-ű termék rendelésekben való előfordulásának listázása (ADMIN)
### User
   #### /api/products
   GET : Minden termék listázása
   POST : Új termék beszúrása (ADMIN)
   #### /api/products/{id}
   GET : Adott {id}-ű termék listázása
   DELETE : Adott {id}-ű termék törlése (ADMIN)
   PUT : Adott {id}-ű termék módosítása (ADMIN)
   #### /api/products/{id}/reservations
   GET : Adott {id}-ű termék rendelésekben való előfordulásának listázása (ADMIN)


## Alkalmazott könyvtárstruktúra
1. src
- main
	- java
		- hu
			- elte
				- PPSupply
					- controllers
						- ProductController.java
						- TagController.java
						- ReservationController.java
						- UserController.java
					- entities
						- User.java
						- Tag.java
						- Order.java
						- Product.java
					- repositories
						- ProductRepository.java
						- TagRepository.java
						- ReservationRepository.java
						- UserRepository.java
					- services
						- MyUserDetailsService.java
					- PpSupplyApplication.java
					- WebSecurityConfig.java
- resources
	- application.properties
	- import.sql

