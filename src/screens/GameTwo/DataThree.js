import BlueCircle from '../../assets/images/imagenesgametwo/CirculoAzul.png';
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
    image: RedSquare,
    firstFigure: 'Circulo',
    secondFigure: 'Cuadrado',
    correct: 'Cuadrado',
  },
].sort(() => 0.5 - Math.random());
