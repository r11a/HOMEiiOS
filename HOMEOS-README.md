# HomeOS Glass V1

הגרסה הראשונה נבנתה כדשבורד YAML עצמאי ואינה משנה את `aa.yaml`.

## דרישות

- `custom:button-card`
- `card-mod`
- `bubble-card` (לשלבים הבאים)
- `kiosk-mode`
- ערכת הנושא `HomeOS Glass`

## התקנה מוצעת

1. העתק את `homeos-v1.yaml` לתיקיית התצורה של Home Assistant.
2. העתק את `homeos-glass-theme.yaml` לתיקיית ה־themes וודא שהגדרת `frontend` טוענת את התיקייה.
3. טען מחדש Themes מתוך כלי המפתחים.
4. הוסף Dashboard חדש מסוג YAML והפנה אותו לקובץ החדש.
5. אם הנתיב של הדשבורד הקיים אינו `/dashboard-clean`, החלף את הקידומת בקישורי המעבר הזמניים.
6. העתק את תיקיית `assets/homeos` אל `/config/www/homeos`. התמונות יהיו זמינות ב־`/local/homeos/`.

## Heebo

העיצוב מבקש `Heebo` עם fallback ל־Arial. כדי להבטיח שהפונט מופיע בכל מכשיר,
יש להתקין אותו כנכס מקומי של Home Assistant בשלב הבא; אין תלות חובה ב־Google Fonts.

## גבולות V1

- מסך הבית ומרכז החדרים חדשים.
- מסכי המדיה, המצלמות והחדרים עדיין מפנים זמנית לדשבורד הקיים.
- לאחר בדיקה במסכים האמיתיים נעביר את הכרטיסים הנבחרים וניצור נכסי יום/ערב/לילה.

## תמונות הקונספט

- `homeos-livingroom-warm.png` — מחוברת לרקע מסך הבית.
- `homeos-kitchen-entry-warm.png`
- `homeos-bedroom-warm.png`
- `homeos-outdoor-rooftop-warm.png`

כל התמונות נוצרו ביחס רחב, עם מוקד חזותי מימין ושטח כהה משמאל עבור טקסט בעברית.
