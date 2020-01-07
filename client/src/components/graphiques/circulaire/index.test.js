import * as d3 from 'd3';
import {renderGraphique} from "./index";

describe('Test D3.js with jasmine ', function () {
  let c;

  beforeEach(async () => {
    let data = {
      "Auvergnes-Rhônes-Alpes": {
        "value": 100,
        "color": "blue"
      }, //autres fake données ici car on a eu du mal à récupérer les données via le serveur en utilisant fetch
    };

    c = renderGraphique(data);
  });

  afterEach(function () {
    d3.selectAll('svg').remove();
  });

  describe('the svg', function () {
    it('should be created', function () {
      expect(getSvg()).not.toBeNull();
    });
    it('should have the correct height', function () {
      expect(getSvg().attr('height')).toBe('600');
    });
    it('should have the correct width', function () {
      expect(getSvg().attr('width')).toBe('1000');
    });
  });

  function getSvg() {
    return d3.select('svg');
  }
});
