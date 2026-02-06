The Idea is it's just a bakery's website.
First we have our generic baker man to greet the user.
Secondly we have our Navbar for future or potential Navigation to pages, such as detailed pages on each baked good.
Thirdly the history section for the local baker vibe a heartfelt story.
Fourthly the location, random place Iowa.
Then the available baked goods.
and lastly a footer for Times and Contact information.

https://zippy-druid-c996a0.netlify.app
Live Site

## Design Choices ##

- Color Palette: Warm gradient background 
- Typography: Noto Sans font 
- Layout: Flexbox and Grid for responsiveness
- Cards: Product cards with soft shadows and rounded corners for a modern, approachable feel
- Fixed Navbar: Easy navigation that persists while scrolling


## CSS ##

### Layout Classes
- .navbar: Fixed-position navigation bar that stays at top while scrolling, uses flexbox for alignment
- .card: CSS Grid container that displays products in a 3-column layout ( 1-column on mobile)
- .card: Individual product card with shadow effects and rounded corners
- .HistorySection: Flexible container for the bakery's story section

### Typography Classes
- .main-font: Applies Noto Sans font (weight 300) with centered text alignment
- .Header: Centers heading text

### Navigation Classes
- .horizontal-menu`: Flexbox layout for horizontal navigation items, removes default list styling
- .vertical-menu: Flexbox column layout for vertical menus (currently unused but available)

### Mobile First
The "@media screen and (max-width: 768px)" section adjusts layout for mobile devices or thin windows on desktop:
- Changes card grid from 3 columns to 1 column
- Reduces padding and gaps
- Ensures navbar doesn't overlap content