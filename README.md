# Hyde Tech Solutions Website

Professional website for Hyde Tech Solutions - AI phone agents and IT infrastructure services.

🌐 **Live Site:** https://shawnhyd3-crypto.github.io/hyde-tech-website/

## Features

- **AI Phone Agents** landing page with beta pricing
- **Consultation booking form** 
- **Dark/Light theme toggle** with persistence
- **Mobile responsive** design
- **Purple/Gold color scheme** with neon accents
- **Smooth animations** and interactions

## Tech Stack

- Pure HTML/CSS/JavaScript (no frameworks)
- GitHub Pages hosting
- Custom CSS with CSS variables for theming

## Pages

| Page | Description |
|------|-------------|
| `/` | Homepage with services overview |
| `/ai-phone-agents/` | Dedicated AI phone agent landing page |
| `/consultation/` | Booking form |

## Color Palette

- **Primary Purple:** #7C3AED
- **Primary Gold:** #F59E0B
- **Neon Cyan:** #00F0FF
- **Red Accent:** #EF4444
- **Dark BG:** #0F0F1A
- **Light BG:** #FAFAFA

## To Do

- [ ] Create `/services/` page
- [ ] Create `/about/` page  
- [ ] Create `/contact/` page
- [ ] Add testimonials section
- [ ] Set up custom domain (hydetech.ca)
- [ ] Add Calendly integration for booking
- [ ] Set up Formspree or similar for form handling

## Local Development

```bash
cd /home/shawnhyd3/.openclaw/workspace/Projects/hyde-tech-website
python3 -m http.server 8000
```

Then open http://localhost:8000

## Deployment

This site is automatically deployed via GitHub Pages when changes are pushed to the `master` branch.

To set up custom domain (hydetech.ca):
1. Go to repo Settings → Pages
2. Under "Custom domain", enter `hydetech.ca`
3. Add CNAME record in Namecheap:
   - Type: CNAME
   - Host: www
   - Value: shawnhyd3-crypto.github.io
4. Add A records for apex domain:
   - Type: A
   - Host: @
   - Values: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153