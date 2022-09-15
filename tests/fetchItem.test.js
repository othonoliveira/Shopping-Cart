require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Verifica se fetchItem é uma função', () => {
    const actual = typeof fetchItem;
    const expected = 'function';
    expect(actual).toEqual(expected);
  });
  it('Verifica se a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });
  it('Verifica se ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(url);
  });
  it('Verifica se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {
    const expected = item;
    const actual = await fetchItem('MLB1615760527');
    expect(actual).toEqual(expected);
  });
  it('Verifica se ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    const actual = await fetchItem();
    expect(actual).toEqual(new Error('You must provide an url'));
  });
});
