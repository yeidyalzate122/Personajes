const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      classes: 'shadow-md bg-purple-dark',
      scrollTo: true
    }
  });

  tour.addStep({
    id: 'nav',
    text: 'Abre el menú y  lee el instructivo ',
    attachTo: {
      element: '.ocultarSeccionNav',
      on: 'bottom'
    },
    classes: 'example-step-extra-class',
    buttons: [
      {
        text: 'Aceptar',
        action: tour.next
      }
    ]
  });
  tour.start();