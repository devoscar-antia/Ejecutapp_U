import CirculoRojo from '../../assets/images/imagenesgametwo/CirculoRojo.png';
import CuadradoAzul from '../../assets/images/imagenesgametwo/CuadradoAzul.png';

export default [
  {
    id: 0,
    image: CirculoRojo,
    firstFigure: 'Circulo',
    secondFigure: 'Cuadrado',
    correct: 'Circulo',
  },
  {
    id: 1,
    image: CuadradoAzul,
    firstFigure: 'Circulo',
    secondFigure: 'Cuadrado',
    correct: 'Cuadrado',
  },
].sort(() => 0.5 - Math.random());
