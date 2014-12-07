module.exports = {
  transaction: {
    create: {
      credit_card: {
        id: 1,
        status: 'paid'
      },
      boleto: {
        id: 1,
        status: 'wayting_payment',
        boleto_url: 'http://pagar.me/boleto/1',
        payment_method: 'boleto'
      }
    },
    refund: {
      status: 'refunded'
    },
    find: [
      { id: 2 }, { id: 3 }, { id: 5 }, { id: 6 }
    ],
    all: [
      { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }
    ],
    get: { id: 1 }
  },
  subscription: {
    create: {
      credit_card: {
        id: 1,
        status: 'paid'
      },
      boleto: {
        id: 1,
        status: 'wayting_payment',
        boleto_url: 'http://pagar.me/boleto/1',
        payment_method: 'boleto'
      }
    },
    refund: {
      status: 'refunded'
    },
    find: [
      { id: 2 }, { id: 3 }, { id: 5 }, { id: 6 }
    ],
    all: [
      { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }
    ],
    get: { id: 1 }
  },
  card_hash_key: {
    id: 108266,
    public_key: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqFTDlIhSV41h7MsygkjN\na1a/3n+zvzDdFZ4/85p0igYTwq6oalqIAz9DbOkLR6smd0tMF6+V1VClphHztoK/\nqlC9DyjXp0S1E9JYGHcbnswy1zvRUxj5ogTJs7tnhNMYLg1+voKNZLnuHJQGUMhq\nRO1IdxBfTbU2hCTNzQopvqd1UqJSvJtV0qHBmxCODIYSrV+Y0BF/Td8SnVFTOJFl\nm+7uqHvaOxnH73vlalhoXVnowfYAYs74S5ZgIg8EW3PopSRaWSNmku/DCV4rhVgV\nNeKBITnAWAxBOGEa24VCfEMobFmlv03WlUJExaOj1OIG8hEge18bl7mkUtXFb//k\n5wIDAQAB\n-----END PUBLIC KEY-----\n'
  }
};
