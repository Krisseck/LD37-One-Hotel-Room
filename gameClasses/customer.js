var Customer = IgeEntity.extend({
  classId: 'Customer',

  sexes: [
    'male',
    'female'
  ],

  firstNames: {
    male: [
      'Jack',
      'Ben',
      'Matt',
      'Charlie',
      'Brad',
      'Christian',
      'Nick'
    ],
    female: [
      'Nora',
      'Mary',
      'Kate',
      'Linda',
      'Jennifer',
      'Susan',
      'Nancy',
      'Lisa',
      'Karen',
      'Donna'
    ]
  },

  lastNames: [
    'Smith',
    'Jackson',
    'Williams',
    'Johnson',
    'Jones',
    'Brown',
    'Davis',
    'Anderson',
    'Martin'
  ],

  /*
  
    SCORING

    Max score: 1000 (500 from occupation and 500 from hobbies)

    Table: Max 140
    Bed: Max 140
    Window: Max 100
    Bathroom: Max 120

  */

  occupations: {
    fashion: {
      name: "Fashion Blogger",
      scores: {
        table: {
          guide: 50,
          radio: 20,
          calculator: 40,
          art_tickets: 140
        },
        bed: {
          stylish: 140,
          hospital: 30,
          chocolate: 80,
          flower: 90
        },
        window: {
          view: 100,
          horse: 50,
          tv: 50
        },
        bathroom: {
          shower: 120,
          bathtub: 120
        }
      }
    },
    nurse: {
      name: "Nurse",
      scores: {
        table: {
          guide: 50,
          radio: 50,
          calculator: 50,
          art_tickets: 140
        },
        bed: {
          stylish: 50,
          hospital: 140,
          chocolate: 90,
          flower: 70
        },
        window: {
          view: 100,
          horse: 50,
          tv: 70
        },
        bathroom: {
          shower: 120,
          bathtub: 120
        }
      }
    },
    accountant: {
      name: "Accountant",
      scores: {
        table: {
          guide: 50,
          radio: 50,
          calculator: 140,
          art_tickets: 70
        },
        bed: {
          stylish: 140,
          hospital: 50,
          chocolate: 50,
          flower: 90
        },
        window: {
          view: 20,
          horse: 100,
          tv: 70
        },
        bathroom: {
          shower: 120,
          bathtub: 120
        }
      }
    },
    cook: {
      name: "Cook",
      scores: {
        table: {
          guide: 140,
          radio: 90,
          calculator: 30,
          art_tickets: 70
        },
        bed: {
          stylish: 60,
          hospital: 30,
          chocolate: 140,
          flower: 70
        },
        window: {
          view: 50,
          horse: 30,
          tv: 100
        },
        bathroom: {
          shower: 120,
          bathtub: 120
        }
      }
    },
    programmer: {
      name: "Programmer",
      scores: {
        table: {
          guide: 30,
          radio: 80,
          calculator: 140,
          art_tickets: 70
        },
        bed: {
          stylish: 50,
          hospital: 30,
          chocolate: 100,
          flower: 140
        },
        window: {
          view: 50,
          horse: 30,
          tv: 100
        },
        bathroom: {
          shower: 120,
          bathtub: 120
        }
      }
    },
    musician: {
      name: "Musician",
      scores: {
        table: {
          guide: 50,
          radio: 140,
          calculator: 30,
          art_tickets: 90
        },
        bed: {
          stylish: 100,
          hospital: 30,
          chocolate: 50,
          flower: 140
        },
        window: {
          view: 100,
          horse: 50,
          tv: 50
        },
        bathroom: {
          shower: 120,
          bathtub: 120
        }
      }
    },
    consultant: {
      name: "Consultant",
      scores: {
        table: {
          guide: 140,
          radio: 80,
          calculator: 50,
          art_tickets: 30
        },
        bed: {
          stylish: 140,
          hospital: 40,
          chocolate: 80,
          flower: 70
        },
        window: {
          view: 50,
          horse: 50,
          tv: 100
        },
        bathroom: {
          shower: 120,
          bathtub: 60
        }
      }
    },
    swimmer: {
      name: "Olympic Swimmer",
      scores: {
        table: {
          guide: 90,
          radio: 50,
          calculator: 40,
          art_tickets: 140
        },
        bed: {
          stylish: 80,
          hospital: 40,
          chocolate: 140,
          flower: 70
        },
        window: {
          view: 80,
          horse: 50,
          tv: 100
        },
        bathroom: {
          shower: 60,
          bathtub: 120
        }
      }
    },
  },

  hobbies: {
    painting: {
      name: "Painting",
      scores: {
        table: {
          guide: 90,
          radio: 50,
          calculator: 40,
          art_tickets: 140
        },
        bed: {
          stylish: 140,
          hospital: 30,
          chocolate: 50,
          flower: 90
        },
        window: {
          view: 100,
          horse: 60,
          tv: 30
        },
        bathroom: {
          shower: 120,
          bathtub: 120
        }
      }
    },
    cycling: {
      name: "Cycling",
      scores: {
        table: {
          guide: 140,
          radio: 50,
          calculator: 30,
          art_tickets: 70
        },
        bed: {
          stylish: 50,
          hospital: 50,
          chocolate: 90,
          flower: 140
        },
        window: {
          view: 100,
          horse: 50,
          tv: 70
        },
        bathroom: {
          shower: 120,
          bathtub: 120
        }
      }
    },
    travelling: {
      name: "Travelling",
      scores: {
        table: {
          guide: 140,
          radio: 60,
          calculator: 30,
          art_tickets: 80
        },
        bed: {
          stylish: 140,
          hospital: 40,
          chocolate: 80,
          flower: 60
        },
        window: {
          view: 100,
          horse: 50,
          tv: 60
        },
        bathroom: {
          shower: 120,
          bathtub: 120
        }
      }
    },
    movies: {
      name: "Movies",
      scores: {
        table: {
          guide: 90,
          radio: 80,
          calculator: 50,
          art_tickets: 140
        },
        bed: {
          stylish: 50,
          hospital: 90,
          chocolate: 140,
          flower: 70
        },
        window: {
          view: 50,
          horse: 50,
          tv: 100
        },
        bathroom: {
          shower: 120,
          bathtub: 120
        }
      }
    },
    fishing: {
      name: "Fishing",
      scores: {
        table: {
          guide: 140,
          radio: 60,
          calculator: 50,
          art_tickets: 30
        },
        bed: {
          stylish: 40,
          hospital: 50,
          chocolate: 80,
          flower: 140
        },
        window: {
          view: 100,
          horse: 60,
          tv: 50
        },
        bathroom: {
          shower: 60,
          bathtub: 120
        }
      }
    },
    gardening: {
      name: "Gardening",
      scores: {
        table: {
          guide: 50,
          radio: 140,
          calculator: 40,
          art_tickets: 70
        },
        bed: {
          stylish: 50,
          hospital: 30,
          chocolate: 50,
          flower: 140
        },
        window: {
          view: 100,
          horse: 50,
          tv: 50
        },
        bathroom: {
          shower: 120,
          bathtub: 120
        }
      }
    },
    riding: {
      name: "Horseback Riding",
      scores: {
        table: {
          guide: 140,
          radio: 50,
          calculator: 50,
          art_tickets: 70
        },
        bed: {
          stylish: 100,
          hospital: 50,
          chocolate: 50,
          flower: 140
        },
        window: {
          view: 50,
          horse: 100,
          tv: 50
        },
        bathroom: {
          shower: 120,
          bathtub: 120
        }
      }
    },
  },

  activeCustomer: {},

  init: function() {

    this.activeCustomer.sex = this.sexes[Math.floor(Math.random() * this.sexes.length)];

    this.activeCustomer.name = this.firstNames[this.activeCustomer.sex][Math.floor(Math.random() * this.firstNames[this.activeCustomer.sex].length)]+" "+this.lastNames[Math.floor(Math.random() * this.lastNames.length)];

    this.activeCustomer.age = Math.floor(Math.random() * 50)+18;

    var occupations = Object.keys(this.occupations);

    this.activeCustomer.occupation = occupations[Math.floor(Math.random() * occupations.length)];

    var hobbies = Object.keys(this.hobbies);

    this.activeCustomer.hobby = hobbies[Math.floor(Math.random() * hobbies.length)];

    return this.activeCustomer;

  },

  getDescription: function() {

    return this.activeCustomer.name+", "+this.activeCustomer.age+" years old "+this.occupations[this.activeCustomer.occupation].name+".\nHobbies: "+this.hobbies[this.activeCustomer.hobby].name+".";

  },

  getScore: function(item, type) {

    if(type=='occupation') {

      return this.occupations[this.activeCustomer.occupation].scores[item][ige.$(item)[item].selectedType];

    } else {

      return this.hobbies[this.activeCustomer.hobby].scores[item][ige.$(item)[item].selectedType];

    }

  }
  
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Customer; }