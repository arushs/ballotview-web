const party = {
  dem: '#0D47A1',
  rep: '#B71C1C',
  lib: '#F57F17',
  gre: '#558B2F'
}

const presidential = {
  title: ['I. ', { text: 'El presidente y el vicepresidente de los Estados Unidos', click: true }],
  secondary: ['Votar por 1 par'],
  poll: [{
    info: [{
      title: [{ text: 'Hilary Clinton', click: true }],
      sub: ['para ', { text: 'el presidente', click: true }]
    }, {
      title: [{ text: 'Tim Kaine', click: true }],
      sub: ['para ', { text: 'el vicepresidente', click: true }]
    }],
    trail: [{ text: 'Demócrata', click: true }],
    color: party.dem
  }, {
    info: [{
      title: [{ text: 'Donald Trump', click: true }],
      sub: ['para ', { text: 'el presidente', click: true }]
    }, {
      title: [{ text: 'Mike Pence', click: true }],
      sub: ['para ', { text: 'el vicepresidente', click: true }]
    }],
    trail: [{ text: 'Republicano', click: true }],
    color: party.rep
  }, {
    info: [{
      title: [{ text: 'Gary Johnson', click: true }],
      sub: ['para ', { text: 'el presidente', click: true }]
    }, {
      title: [{ text: 'William Weld', click: true }],
      sub: ['para ', { text: 'el vicepresidente', click: true }]
    }],
    trail: [{ text: 'Libertario', click: true }],
    color: party.lib
  }, {
    info: [{
      title: [{ text: 'Jill Stein', click: true }],
      sub: ['para ', { text: 'el presidente', click: true }]
    }, {
      title: [{ text: 'Ajamu Baraka', click: true }],
      sub: ['para ', { text: 'el vicepresidente', click: true }]
    }],
    trail: [{ text: 'Verde', click: true }],
    color: party.gre
  }]
};

const senator = {
  title: ['II. ', { text: 'El senador de Estados Unidos, California', click: true }],
  secondary: ['Vote por 1'],
  poll: [{
    info: [{
      title: [{ text: 'Kamala Harris', click: true }]
    }],
    trail: [{ text: 'Demócrata', click: true }],
    color: party.dem
  }, {
    info: [{
      title: [{ text: 'Loretta Sanchez', click: true }]
    }],
    trail: [{ text: 'Demócrata', click: true }],
    color: party.dem
  }]
};

const prop51 = {
  title: [{ text: 'La Propuesta 51 de California', click: true }, ', ', 'Bonos de Instalaciones Públicas'],
  secondary: [{ text: 'Educación', click: true }, '. ', { text: 'CISS', click: true }, '. ', '$9 mil millones en bonos para la educación y las escuelas.'],
  poll: [{
    info: [{
      title: [{ text: 'Sí', click: true }]
    }, {
      sub: ['Un voto de "sí" apoya el estado que emite $ 9 mil millones en bonos para financiar la mejora y construcción de las instalaciones escolares para escuelas K-12 y universidades de la comunidad.']
    }]
  }, {
    info: [{
      title: [{ text: 'No', click: true }]
    }, {
      sub: ['Un voto de "no" se opone al Estado emisor $ 9 mil millones en nueva deuda para financiar la mejora y construcción de instalaciones educativas.']
    }]
  }]
};

const prop52 = {
  title: [{ text: 'La Propuesta 52 de California', click: true }, ', ', 'La aprobación de los votantes para desviar la atención hospitalaria ingresos dedicados a Medi-Cal'],
  secondary: [{ text: 'Cuidado de la salud', click: true }, '. ', { text: 'CICA/SS', click: true }, '. ', 'Aprobación de los votantes de los cambios en el programa de tarifas hospital.'],
  poll: [{
    info: [{
      title: [{ text: 'Sí', click: true }]
    }, {
      sub: ['Un voto de "sí" admite que requieran aprobación de los votantes para cambiar el uso dedicado de ciertas cuotas de los hospitales se utilizan para dibujar a juego crédito de fondos federales servicios de Medi-Cal. La iniciativa también fue diseñado para requerir una mayoría de dos tercios de la Legislatura de California para poner fin al programa de tarifas hospital.']
    }]
  }, {
    info: [{
      title: [{ text: 'No', click: true }]
    }, {
      sub: ['Un voto de "no" se opone a esta iniciativa, permite que el legislador de modificar, ampliar o eliminar el programa de tarifa hospital con un voto de la mayoría.']
    }]
  }]
};

export default [presidential, senator, prop51, prop52];
