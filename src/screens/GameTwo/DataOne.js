import BorderCircle from '../../assets/images/imagenesgametwo/CirculoBorde.png';
import BorderSquare from '../../assets/images/imagenesgametwo/CuadadoBorde.png';

export default [
  {
    id: 0,
    image: BorderCircle,
    circle: 'Circulo',
    square: 'Cuadrado',
    correct: 'Circulo',
  },
  {
    id: 1,
    image: BorderSquare,
    circle: 'Circulo',
    square: 'Cuadrado',
    correct: 'Cuadrado',
  },
].sort(() => 0.5 - Math.random());
