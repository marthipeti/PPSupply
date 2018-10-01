# PPSupply

A PaperSupply egy olyan alkalmazás, amin keresztül papír-írószer, valamint csomagolóanyagokat rendelhetünk.

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
