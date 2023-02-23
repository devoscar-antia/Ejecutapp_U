import BlueCircle from '../../assets/images/imagenesgametwo/CirculoAzul.png';
import RedCircle from '../../assets/images/imagenesgametwo/CirculoRojo.png';
import BorderCircle from '../../assets/images/imagenesgametwo/CirculoBorde.png';
import BorderSquare from '../../assets/images/imagenesgametwo/CuadadoBorde.png';
import BlueSquare from '../../assets/images/imagenesgametwo/CuadradoAzul.png';
import RedSquare from '../../assets/images/imagenesgametwo/CuadradoRojo.png';

export default [
  {
    id: 0,
    image: BlueCircle,
    firstFigure: 'Circulo',
    secondFigure: 'Cuadrado',
    correct: 'Circulo',
  },
  {
    id: 1,
    image: RedCircle,
    firstFigure: 'Circulo',
    secondFigure: 'Cuadrado',
    correct: 'Circulo',
  },
  {
    id: 2,
    image: BorderCircle,
    firstFigure: 'Circulo',
    secondFigure: 'Cuadrado',
    correct: 'Circulo',
  },
  {
    id: 3,
    image: BorderSquare,
    firstFigure: 'Circulo',
    secondFigure: 'Cuadrado',
    correct: 'Cuadrado',
  },
  {
    id: 4,
    image: BlueSquare,
    firstFigure: 'Circulo',
    secondFigure: 'Cuadrado',
    correct: 'Cuadrado',
  },
  {
    id: 5,
    image: RedSquare,
    firstFigure: 'Circulo',
    secondFigure: 'Cuadrado',
    correct: 'Cuadrado',
  },
].sort(() => 0.5 - Math.random());
