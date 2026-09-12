# Greenwood Public Library Web Landing Page

An editorial-style, responsive landing page for Greenwood Public Library created using pure HTML5 and native Tailwind CSS (via CDN).

## Technical Implementation Highlights:
1. **Sticky Navbar**: Backdrop blur (`backdrop-blur-md`) with custom hover underline animations on navigation links using Tailwind pseudo-elements (`after:w-0 hover:after:w-full`).
2. **Editorial Hero Section**: Light typography layout, image scaling (`group-hover:scale-105`), and a 4-column statistical overview.
3. **Interactive Sections Grid**: Hover background color transitions (`hover:bg-emerald-50`, `hover:bg-amber-50`, etc.) with group text color shifts.
4. **Spaces Gallery**: 2x2 grid featuring zoom effects and absolute floor location badges.
5. **Asymmetrical Bento Grid**: Multi-span layout highlighting library values with distinct pastel backgrounds.
6. **Newspaper Style Text Columns**: Built using Tailwind column utility classes (`columns-1 sm:columns-2`).
7. **Membership Cards**: Grid of membership options featuring image headers, pricing, and an absolute-positioned "Popular" badge.
8. **Grayscale Testimonial Avatar**: Avatar transition effect from grayscale to full color (`grayscale hover:grayscale-0`).
9. **Contact CTA Block**: Styled block with address, operating hours, and actions.
10. **Events Grid & Footer**: 4-column blog-style event preview and multi-column footer.
