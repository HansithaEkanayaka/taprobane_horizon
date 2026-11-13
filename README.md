# Taprobane Horizon

A responsive hotel website for a luxury beachfront resort in Sri Lanka. Visitors can search availability, browse rooms and suites, book a stay, and come back later to see or cancel their bookings.

Built with React, TypeScript, Vite and Tailwind CSS. No backend is needed to run it.

## Features

- **Availability search** - pick dates and guests; the room list filters by capacity and shows the total price for the stay.
- **Room booking** - booking form with validation, live price total and a confirmation reference (for example `TH-4K9X2Q`).
- **My Bookings** - every booking is saved in the browser. Open it from the calendar icon in the navbar to see upcoming, current and past stays, check-in countdowns and totals, and to cancel or remove a booking.
- **Double-booking guard** - the same room cannot be booked twice for overlapping dates.
- **Gallery** with category filters and a keyboard-friendly lightbox.
- **Mobile friendly** layout, back-to-top button and smooth anchor scrolling.
- Self-hosted fonts (Fraunces and Jost), so there are no external font requests.

## Tech stack

| Area | Tools |
| --- | --- |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Build | Vite |
| Fonts | Fraunces (headings), Jost (body) via Fontsource |
| Storage | Browser `localStorage` |

## Getting started

You need Node.js 18 or newer.

```bash
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Run the TypeScript compiler without building |

## Project structure

```
src/
  components/    Page sections and dialogs (Hero, Rooms, BookingModal, MyBookings, ...)
  data/          Rooms, gallery and amenities content
  hooks/         useBookings - saving, cancelling and syncing bookings
  utils/         Date helpers
  types.ts       Shared TypeScript types
  index.css      Tailwind theme (colours and fonts)
public/          Favicon
```

## How bookings are stored

There is no server. Bookings are written to `localStorage` under the key `taprobane-horizon:bookings`, so they stay on the same browser and device and survive a page refresh. Clearing site data removes them. Payments are not processed and no room is really held, so treat it as a demo until a backend is connected.

To make it real, replace the save step in `src/hooks/useBookings.ts` (and the submit handler in `BookingModal.tsx`) with a call to your API.

## Customising

- **Rooms, prices and photos:** edit `src/data/rooms.ts`.
- **Gallery and amenities:** edit `src/data/gallery.ts` and `src/data/amenities.ts`.
- **Colours and fonts:** edit the `@theme` block in `src/index.css`. To change a font, install a Fontsource package, import it in `src/main.tsx` and update `--font-serif` or `--font-sans`.

## Notes

- Photos are loaded from Unsplash, so an internet connection is needed to see them.
- The newsletter form is front-end only and does not store emails.
