# Rooftop Rumble · Android

A Tunisian 1v1 fighting game with Tekken-style controls: nine fighters with their own strings, movement, specials and supers, six stages, Arcade / VS CPU / Training modes, and **Wi-Fi / hotspot PvP paired with a QR code** (no internet needed).

## Controls

| Touch | Keyboard | What it does |
|---|---|---|
| ◀ ▶ ▲ ▼ | Arrows, WASD or ZQSD | Move, jump, crouch. Hold away from your opponent to block (crouch to block lows, stand to block overheads) |
| 1 | U | Left punch (a high: crouching ducks it) |
| 2 | I | Right punch |
| 3 | J | Left kick |
| 4 | K | Right kick (high) |
| S | L | Special at half meter, SUPER at full meter |
| GRAB | O, or U+J together | Throw. Press 1 or 2 when grabbed to break it. Crouching ducks throws |
| II | Esc | Pause and move list |

Everyone has **1 2** (One-Two), **↓+2** (launcher: juggle them in the air with 1 or 4) and **↓+4** (sweep). Each fighter's own strings, direction moves and movement trick are in the move list on the fighter select screen and in the pause menu.

## Last Breath (آخر نفس)

Once per round, when your health drops to 25% or less, press **S + GRAB** together (or the red **LAST BREATH** button, or **H** on a keyboard). Each fighter's move is slow or easy to read, and leaves you wide open if it misses; if it lands, it plays a short cinematic and deals about a third of a health bar.

| Fighter | Move | How to avoid it |
|---|---|---|
| Hamma | Bab Sidi Bou Said: charges in and hammers you through a giant blue door | Block |
| Mokhtar | La Goulette Anchor: an anchor crashes down a fixed distance ahead | Don't stand there |
| Elissa | Fire of Tanit: the sign of Tanit marks the ground under you, then erupts | Step off it |
| Selma | Guellala Jar: a huge Djerba clay jar lands on you and traps you | Move |
| Dihya | Scorched Earth: a sprint across the arena on a trail of fire | Jump, or block low |
| Zied | Chlouk Storm: a slow sirocco twister along the ground | Block or jump |
| Salah | Chkobba!: a card-sharp's stance that punishes any strike; if you wait, he lunges in anyway | Block the lunge, or throw him during the stance |
| Hannibal | Cannae: two ranks of soldiers close in from both sides | Jump or get out |
| Kmar | Barra Aqra!: an ear-grab and a slipper lecture | Crouch, jump or stay out of reach |

## Art and cultural references

The game is drawn as pixel art: the world renders at low resolution and is scaled up with hard pixels, and every fighter is an outlined sprite. Fonts: Press Start 2P and Pixelify Sans (SIL Open Font License).

Details come from Wikipedia (and French Vikidia for Djerba's costumes): the Tunisian jebba (calf-length, bare forearms, worn with a farmla waistcoat, sarouel, silk belt, balgha slippers and a chechia), the chechia and the Souk Ech-Chaouachine (1691) in the Medina of Tunis, the blouza work tunic, Djerba's m'dhalla palm-leaf hat and fouta zarga (dark blue with red stripes), the hamsa/khamsa and the sefseri, North African turbans (white, beige or brown among Bedouin tribes), the sirocco's Tunisian name chlouk (šlūq), Tyrian purple (Pliny ranked Djerba's purple second only to Tyre's), Sidi Bou Said, La Goulette and its 1535 fort, brik, Dido/Elissa and the oxhide of Byrsa, Dihya and her legendary last stand in the Amphitheatre of El Jem (built around 238 AD for about 35,000), the Kerkennah Islands, and Douz (gateway to the Sahara, 500,000 palms, saluki races at the Festival of the Sahara). Salah and his stage come from French Wikipedia's article on chkobba (the Tunisian card game derived from Italian scopa: a 40-card deck whose diamond suit is called dinari, taking cards called akala, the chkobba table sweep, and the karta, dinari, bermila and sab'a l-hayya points, played in cafés with cards slapped down) and from Café M'Rabet in the Medina of Tunis, founded in the early 17th century and described as the oldest café in Tunisia, known for its central banquette and columns. Hannibal comes from Wikipedia's articles on Hannibal (son of Hamilcar Barca; crossed the Alps in 218 BC with North African war elephants, 38 of which reached the Rhône; victories at the Trebia, Lake Trasimene and Cannae, where he used a double envelopment; lost his right eye crossing the Apennines in 217 BC), the North African elephant (smaller than other elephants; his own elephant was called Surus, possibly 'the One-Tusker') and the Battle of Cannae (no elephants were used there, so his elephant super is named after the crossing of the Alps instead). Elissa's lash and Byrsa super follow the oxhide legend from Wikipedia's Dido article. Kmar is an original character, a Tunisian mom in a sefseri-style headscarf and apron, armed with a wooden spoon, a msalha (the floor squeegee with its wet cloth) and the famous flying slipper (chlaka).

## Get the APK (easiest: GitHub builds it for you)

1. Create a new GitHub repository and upload everything in this folder (keep the `.github` folder, it is hidden on some systems).
2. Open the **Actions** tab. The **Build Android APK** workflow starts by itself on every push to `main` (or press **Run workflow**).
3. When it finishes (about 5 minutes), open the run and download **rooftop-rumble-apk** at the bottom. Unzip it to get `app-debug.apk`.
4. Copy the APK to your phone and open it. Android will ask you to allow installing apps from this source the first time.

## Or build it in Android Studio

You need Node.js 22, Android Studio (with JDK 21, which it ships with) and Python 3.

```bash
python3 build.py          # assembles app/www from src/
cd app
npm install
npx cap sync android      # copies the game into the Android project
npx cap open android      # opens Android Studio
```

In Android Studio: **Build → Build App Bundle(s) / APK(s) → Build APK(s)**, or press Run with your phone plugged in (USB debugging on).

## Playing online (mobile data)

VS FRIEND → **Online · Create room** gives the host a 5-letter room code to send to a friend (the Share button opens WhatsApp, Messenger and so on). The friend picks **Online · Join room** and types the code. Both phones only need mobile data or any internet connection.

The free public PeerJS server only introduces the two phones. The match then runs on a direct phone-to-phone link, or through PeerJS's free relay (TURN) server when a mobile network blocks direct links. The host's phone still runs the whole fight. The ping in milliseconds shows under the timer. Those free servers have no uptime guarantee; if online pairing fails, the Wi-Fi/hotspot mode still works with no internet at all.

## Playing with a friend over Wi-Fi

1. Both phones install the app.
2. Put both phones on the same Wi-Fi, **or** turn on the hotspot on one phone and connect the other to it. No internet is needed.
3. Phone A: **VS FRIEND → Host**. It shows a QR code.
4. Phone B: **VS FRIEND → Join**, and scan phone A's code. Phone B now shows its own code.
5. Phone A: **Step 2 · Scan their code**, and scan phone B's code.
6. Both pick fighters, the host picks the stage, fight.

Allow the camera when asked. Besides scanning, it lets the phones find each other on the network.
No camera? Each screen has "No camera? Send this code instead", so you can send the code over WhatsApp and paste it.

If the phones can't connect: check they are on the **same** network (guest Wi-Fi in cafés often blocks phones from seeing each other, a phone hotspot always works), then pair again.

## How the code is organised

| Path | What it is |
|---|---|
| `src/game.html` | The whole game: fighters, moves, combos, networking, menus, drawing |
| `src/stages.js` | The five stages |
| `build.py` | Builds `app/www/index.html` (the app) and `preview/rooftop-rumble.html` (single-file, vs CPU, opens in any browser) |
| `lib/` | QR code generator and QR scanner (MIT / Apache-2.0) |
| `fonts/` | Teko, Barlow Condensed, Aref Ruqaa (SIL Open Font License) |
| `app/` | Capacitor project; `app/android` is the Android Studio project |

Tweak a fighter: everything about each one is in the `CHARS` list in `src/game.html` (`chain` = strings such as `'onetwo>rk'`, `cmd` = direction moves such as `f2` for forward+2, `tech` = movement, `sp` = special). Move timings, damage and hit heights are in `MOVES`; animation poses and wind-ups are in `POSES` and `WIND`. Run `python3 build.py` after any change.

**How Wi-Fi play works:** the phones connect directly with WebRTC data channels. The QR codes carry the connection details (compressed). The host phone runs the fight and sends the picture state to the guest about 60 times a second; the guest sends its button presses back.
