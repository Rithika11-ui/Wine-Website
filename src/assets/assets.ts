import logo from '../assets/images/Logo.png'
import auswat from '../assets/images/auswat.png'
import shiraz from '../assets/images/shiraz.png'
import reddeer from '../assets/images/redddeer.png'
import rockart from '../assets/images/shiraz.png'
import taylor from '../assets/images/taylor.png'
import taylorpink from '../assets/images/taylorpink.png'
import thera from '../assets/images/thera.png'
import therablue from '../assets/images/therablue.png'
import leradict from '../assets/images/leradict.png'
import almendro from '../assets/images/almendro.png'
import pinot from '../assets/images/pinot.png'
import plaradin from '../assets/images/plaradin.png'
import hope from '../assets/images/hope.png'
import calvahas from '../assets/images/calvahas.png'
import orma from '../assets/images/orma.png'
import masendes from '../assets/images/masandes.png'
import glass from '../assets/images/glass.png'
import vdoblog from './vdoblog.mp4'
import wyvern from '../assets/images/wyvern.png'
import estate from '../assets/images/sizeland.png'
import sunsetwine from '../assets/images/sunsetwine.png'
import heroaboutus from '../assets/images/heroaboutus.png'
import educationblog from '../assets/images/educationblog.png'
import sustainability from '../assets/images/sustainability.png'
import lifestyle from '../assets/images/lifestyle.png'
import lagacy from '../assets/images/wineaward.png'
import librayroom from '../assets/education/librarybottle.png'
import pourwine from '../assets/education/pourwine.png'
import soil from '../assets/education/soil.png'
import susbanner from '../assets/sustainability/susbanner.png'
import banner from '../assets/sustainability/banner.png'
import dinner from '../assets/lifestyle/dinner.png'
import summer from '../assets/lifestyle/summer.png'
import modern from '../assets/lifestyle/modern.png'
import meeting from '../assets/lifestyle/meetingdinner.png'
import facebook from '../assets/Auth/facebook.png'
import google from '../assets/Auth/google.png'
import instagram from '../assets/Auth/ig.png'

export const assets = {
    logo,
    auswat,
    shiraz,
    reddeer,
    rockart,
    taylor,
    taylorpink,
    hope,
    thera,
    leradict,
    almendro,
    pinot,
    plaradin,
    calvahas,
    orma,
    masendes,
    therablue,
    glass,
    vdoblog,
    wyvern,
    estate,
    sunsetwine,
    heroaboutus,
    educationblog,
    sustainability,
    lifestyle,
    lagacy,
    librayroom,
    pourwine,
    soil,
    susbanner,
    banner,
    dinner,
    summer,
    modern,
    meeting,
    facebook,
    google,
    instagram
}

export default assets


export const products = [
  { 
    id: 1, 
    name: 'Cabernet Sauvignon', 
    category: 'Red', 
    price: 45.00, 
    discountPrice: 38.00, // New: Dynamic discount
    volume: '750ml', 
    alcohol: '14.5%', 
    region: 'Napa Valley',
    img: assets.leradict, 
    tag: 'New',
    desc: 'A bold red with deep notes of dark cherry and spice, perfect for cellaring.',
    tastingNotes: 'Blackberry, tobacco, and velvet tannins with a long, elegant finish.'
  },
  { 
    id: 3, 
    name: 'Vintage Merlot', 
    category: 'Red', 
    price: 52.00, 
    discountPrice: null, // No discount for this one
    volume: '750ml', 
    alcohol: '13.8%', 
    region: 'Bordeaux',
    img: assets.almendro, 
    tag: 'Limited', 
    desc: 'A smooth, velvety Merlot with hints of plum and vanilla bean.',
    tastingNotes: 'Plum, violet, and toasted oak with a silky mouthfeel.'
  },
  { 
    id: 4, 
    name: 'Sparkling Brut', 
    category: 'Sparkling', 
    price: 65.00, 
    discountPrice: 55.00,
    volume: '750ml', 
    alcohol: '12.0%', 
    region: 'Champagne',
    img: assets.plaradin, 
    tag: 'Award Winner',
    desc: 'Crisp and refreshing with delicate bubbles and a bright citrus finish.',
    tastingNotes: 'Green apple, brioche, and lemon zest with fine effervescence.'
  },
  { 
    id: 5, 
    name: 'Taylor Pink Rose', 
    category: 'Rose', 
    price: 32.00, 
    volume: '750ml', 
    alcohol: '11.5%', 
    region: 'Provence',
    img: assets.taylorpink, 
    tag: '', 
    desc: 'A light, floral Rose that captures the essence of a summer afternoon.',
    tastingNotes: 'Wild strawberry, rose petals, and white peach.'
  },
  { 
    id: 6, 
    name: 'Dessert Calvahas', 
    category: 'Dessert', 
    price: 28.00, 
    volume: '375ml', // Dessert wines are often in smaller bottles
    alcohol: '10.5%', 
    region: 'Loire Valley',
    img: assets.calvahas, 
    tag: '', 
    desc: 'A rich, honeyed dessert wine with a balanced acidity.',
    tastingNotes: 'Apricot, honey, and orange marmalade.'
  },
];

