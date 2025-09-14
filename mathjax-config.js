window.MathJax = {
    loader: {load: ['[tex]/mathtools']},
    tex: {
        packages: {'[+]': ['mathtools']},
        inlineMath: [['\\(', '\\)']],
        displayMath: [['\\[', '\\]']],
        processEnvironments: true,
        macros: {
            Ind: ["{\\text{Ind}^#1_#2(#3)}", 3],
        },
        tags: 'ams'
    },
    svg: {
      fontCache: 'global'
    }
  };