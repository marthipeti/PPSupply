![PPS logo](/images/logo-text-black-mini.png)

A PaperSupply egy olyan alkalmazás, amin keresztül papír-írószer, valamint csomagolóanyagokat rendelhetünk.

# Projektötlet

## Funkcionális követelmények

#### Vendégként:
- hozzáférhetünk a termékek listájához → *Termékek* *listázása*
- termékeket tehetünk be a kosárba -> *Termékek* *kosárba* *helyezése*

#### Felhasználóként:
- *Vendég jog*
- rendelést adhatunk le a készleten lévő termékekre → *Rendelés* *leadása*
- módosíthatjuk profilunk adatait → *Profil* *szerkesztése*
- listázhatjuk korábbi rendeléseinket → *Rendelések* *listázása*

#### Adminisztrátorként:
- *Felhasználói jog*
- vehetünk fel új terméket → *Termék* *felvétele*
- törölhetünk terméket → *Termék* *törlése*

## Szerepkörök:
- **vendég:** Felhasználói profil nélkül böngészhet a termékek között, tehet be terméket a kosárba, de nem rendelhet
- **felhasználó:** *vendég szerepkör* + Regisztráció után rendelhet
- **adminisztrátor:** *felhasználó szerepkör* + Szerkeszti a termékek adatbázisát

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

	GET,PUT: csak saját ID (api/users/{id}) 
-	Adminisztrátor:	

	GET, PUT: csak saját ID (api/users/{id}): 

### Termékek táblája
-	Vendég: 

	GET: összes ID (api/products, api/products/{id})
-	Felhasználó:

	GET: összes ID (api/products, api/products/{id})
-	Adminisztrátor:

	GET, POST, DELETE:  összes ID (api/products, api/products/{id})

### Rendelések táblája
-	Vendég: 

	nincs hozzáférése
-	Felhasználó:

	GET, DELETE: csak saját ID (api/orders/{userid}
-	Adminisztrátor:	

	GET, DELETE:  összes ID (api/orders/{id},  api/orders/{userdid})

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
- GET : Minden termék listázása
- POST : Új termék beszúrása (ADMIN)
#### /api/products/{id}
- GET : Adott {id}-ű termék listázása
- DELETE : Adott {id}-ű termék törlése (ADMIN)
### Reservation
#### /api/reservation
- GET : Minden foglalás listázása
- POST : Új foglalás beszúrása
#### /api/reservation/{id}
- GET : Adott {id}-ű foglalás listázása
- DELETE : Adott {id}-ű foglalás törlése
### Tag
#### /api/tags
- GET : Minden TAG listázása (ADMIN)
#### /api/users/{id}
- PUT : Adott {id}-ű felhasználó módosítása

## Login végpont működése

![szekvencia-diagram](/images/endpoint.png)

## Alkalmazott könyvtárstruktúra
1. src (BACKEND)
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
	
2. src (FRONTEND)
- **app**
	- **calsses**
		- _cart.ts_
		- _orderedQuantity.ts_
		- _product.ts_
		- _reservation.ts_
		- _tag.ts_
		- _user.ts_
	- **cart-page**
		- _cart-page.component.css_
		- _cart-page.component.html_
		- _cart-page.component.ts_
	- **contact-page**
		- _contact-page.component.css_
		- _contact-page.component.html_
		- _contact-page.component.ts_
	- **login-page**
		- _login-page.component.css_
		- _login-page.component.html_
		- _login-page.component.ts_
	- **navigation-bar**
		- _navigation-bar.component.css_
		- _navigation-bar.component.html_
		- _navigation-bar.component.ts_
	- **product-page**
		- _product-page.component.css_
		- _product-page.component.html_
		- _product-page.component.ts_
	- **profile-page**
		- _profile-page.component.css_
		- _profile-page.component.html_
		- _profile-page.component.ts_
	- **routing**
		- _routing.module.ts_
	- **services**
		- _auth.service.ts_
		- _cart.service.ts_
		- _http.service.ts_
		- _product.service.ts_
		- _reservation.service.ts_
		- _tag.service.ts_
		- _user.service.ts_
	- _app.module.ts_

- **assets**
	- **img**
	
	
# Frontend

## Új termék hozzáadása adminként
1. A megfelelő mezők kitöltése:
	- Név: tetszőleges nem üres string
	- Leírás: tetszőleges nem üres string
	- Mennyiség: 0-nál nagyobb szám
	- Kép: a termékhez tartozó kép fájlneve vagy üres
	- Tagek: üres vagy megfelelő tagek kiválasztása a legördülő listából
2. „Termék hozzáadása” gomb megnyomásának hatására meghívódik az ```javascriptonSubmit()``` metódus
3. A mezők adatai mentésre kerülnek, majd validálónak
4. Probléma esetén jelezzük a felhasználónak, hogy melyik mező validációja volt sikertelen
5. Sikeres validáció után a productService segítségével egy HTTP POST requestben elküldjük az új terméket a szervernek
6. A program visszairányít minket a „Termékek” oldalra

## Kliensoldali szolgáltatások

### Bejelentkezés/kijelentkezés

### Profilom
- bejelentkezés után saját adatok szerkesztése (felhasználónév, e-mail cím, saját név)
- rendelések a profil menüpont alatt a Rendeléseim oldalon találhatóak meg
- a rendeléseket vissza lehet mondani
- (ADMIN) termék hozzáadása fülnél lehet új terméket hozzáadni

### Termékek
- termékek böngészése
- kosárba rakás

### Kapcsolat
- cég adatait tartalmazza

### Kosár
- hozzáadott termékek számát lehet csökkenteni vagy növelni, illetve teljesen kitörölni
- megrendelés

## Kapcsolat a szerverrel

A kliensben egy http.service osztállyal kapcsolódtunk a szerverhez, aminek generikus metódusai vannak az összes kérésről. A kérések Promise-t használnak az adatok lekérésére.

