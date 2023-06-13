////    GLOBALS     ////////////////////////////////////////

    let contents =
    {
        'javascript-single':  'class ClassName\n{\n    _prop_one = 0;\n    _prop_two = \'string\';\n\n    constructor ( )         { /* code */ }\n\n    set prop_one ( value )  { /* code */ }\n    set prop_two ( value )  { /* code */ }\n\n    get prop_one ( )        { /* code */ }\n    get prop_two ( )        { /* code */ }\n\n    get method_get_only ( ) { /* code */ }\n\n    _private_method ( )     { /* code */ }\n\n    public_method ( )       { /* code */ }\n}',
        'javascript-linked':  '/**\n * @class           {Object}      One                           Description\n * @property        {number}      prop0                         Description\n * @property        {string}      prop1                         Description\n * @property        {Two}         prop2                         Description\n * @property        {Three}       prop3                         Description\n */\nclass One\n{\n    _prop0 = 0;\n    _prop1 = \'string\';\n    _prop2 = new Two;\n    _prop3 = new Three;\n\n    constructor ( ) { }\n\n    set prop0 ( value ) { }\n    get prop0 ( ) { }\n\n    set prop1 ( value ) { }\n    get prop1 ( ) { }\n\n    set prop2 ( value ) { }\n    get prop2 ( ) { }\n\n    set prop3 ( value ) { }\n    get prop3 ( ) { }\n}',
        'plantscript-single': '@startuml\n\nclass ClassName {\n    _prop_one   <color:gray>{number}</color>\n    _prop_two   <color:gray>{string}</color>\n    __ Setter __\n    prop_one\n    prop_two\n    __ Getter __\n    prop_one\n    prop_two\n    method_get_only\n    _private_method\n    public_method\n}\n@enduml',
        'plantuml-single':    '<img src="images/uml_class.png">',
        'plantuml-linked':    '<img src="images/linked-uml-class.png" class="small-image">'
    }

    let _defaults =
    {
        stringsElement:         null,
        typeSpeed:              10,                 /* @property {number} typeSpeed type speed in milliseconds */
        startDelay:             0,                  /* @property {number} startDelay time before typing starts in milliseconds */
        backSpeed:              0,                  /* @property {number} backSpeed backspacing speed in milliseconds */
        smartBackspace:         true,               /* @property {boolean} smartBackspace only backspace what doesn't match the previous string */
        shuffle:                false,              /* @property {boolean} shuffle shuffle the strings */
        backDelay:              700,                /* @property {number} backDelay time before backspacing in milliseconds */
        fadeOut:                false,              /* @property {boolean} fadeOut Fade out instead of backspace */
        fadeOutClass:           'typed-fade-out',   /* @property {string} fadeOutClass css class for fade animation */
        fadeOutDelay:           500,                /* @property {boolean} fadeOutDelay Fade out delay in milliseconds */
        loop:                   false,              /* @property {boolean} loop loop strings */
        loopCount:              Infinity,           /* @property {number} loopCount amount of loops */
        showCursor:             false,              /* @property {boolean} showCursor show cursor */
        cursorChar:             '|',                /* @property {string} cursorChar character for cursor */
        autoInsertCss:          true,               /* @property {boolean} autoInsertCss insert CSS for cursor and fadeOut into HTML <head> */
        attr:                   null,               /* @property {string} attr attribute for typing */
        bindInputFocusEvents:   false,              /* @property {boolean} bindInputFocusEvents bind to focus and blur if el is text input */
        contentType:            'html',             /* @property {string} contentType 'html' or 'null' for plaintext */
        onBegin:                ( self )           => {},       /* Before it begins typing */
        onComplete:             ( self )           => {},       /* All typing is complete */
        preStringTyped:         ( arrayPos, self ) => {},       /* Before each string is typed */
        onStringTyped:          ( arrayPos, self ) => {},       /* After each string is typed */
        onLastStringBackspaced: ( self )           => {},       /* During looping, after last string is typed */
        onTypingPaused:         ( arrayPos, self ) => {},       /* Typing has been stopped */
        onTypingResumed:        ( arrayPos, self ) => {},       /* Typing has been started after being stopped */
        onReset:                ( self )           => {},       /* After reset */
        onStop:                 ( arrayPos, self ) => {},       /* After stop */
        onStart:                ( arrayPos, self ) => {},       /* After start */
        onDestroy:              ( self )           => {},       /* After destroy */
    }

////    FUNCTIONS   ////////////////////////////////////////

    ////    SHORT HAND  ////////////////////////////

        let setTypedDefaults = ( typedObject ) => { for ( let _default in _defaults ) typedObject [ _default ] = _defaults [ _default ]; }

    ////    COMMON  ////////////////////////////////

        function injectContent ( )
        {
            for ( let content in contents )
            {
                let elements = document.getElementsByClassName ( content );


                for ( let element of elements ) element.innerHTML = contents [ content ];
            }
        }

        function animationBackgroundFlicker ( elements )
        {
            let timing = 100;

            for ( let element of elements )
            {
                let backgroundColor = document.defaultView.getComputedStyle ( element, null ).backgroundColor

                let count = 0


                let flashAnimation = setInterval ( function ( )
                {
                    let flashColor  = 'gray';

                    let flashAmount = 2;


                    if ( count > flashAmount ) clearInterval ( flashAnimation );


                    element.style.backgroundColor = ( element.style.backgroundColor != flashColor ) ? flashColor : backgroundColor;


                    count++;

                },
                timing );
            }
        }

        function setTypedListener ( typedObject )
        {
            window.addEventListener ( 'scroll', ( ) =>
            {
                let elementBox = document.getElementById ( typedObject.el.id ).getBoundingClientRect ( );


                ( elementBox.top    < window.innerHeight ) ? typedObject.start ( ) : typedObject.reset ( );

                ( elementBox.bottom < 0                  ) ? typedObject.reset ( ) : typedObject.start ( );
            });

            typedObject.options.onComplete = function ( )
            {
                let element = document.getElementById ( typedObject.el.parentElement.parentElement.getAttribute ( 'for' ) );


                ( element.style.display != 'block' )

                    ? $( element ).show ( 'slide', null, 750, null )

                    : animationBackgroundFlicker ( element.children [ 1 ].children );
            }
        }

////    INSTANTIATION   ////////////////////////////////////

    let typedPlantScript = new Typed ( '#js-to-plantscript',
    {
        strings: [ '`&rarr; app : `python3^300 BuildClass.py^300 ~/Programs/JavaScript/Classes/class.js^700 ` &crarr;\n>> [ output ]\n /Users/username/Programs/JavaScript/Classes/output/class.txt`' ]
    } );

    let typedPlantUml    = new Typed ( '#js-to-plantuml',
    {
        strings: [ '`&rarr; app : `python3^300 BuildClass.py^300 ~/Programs/JavaScript/Classes/class.js^300 -m^300 "png"^700 ` &crarr;\n>> [ output ]\n /Users/username/Programs/JavaScript/Classes/output/class.txt\n /Users/username/Programs/JavaScript/Classes/output/images/class.png`' ]
    } );

    let typedPlantLinkedUml = new Typed ( '#js-to-linked-plantuml',
    {
        strings: [ '`&rarr; app : `python3^300 BuildClass.py^300 ~/Programs/JavaScript/Classes/^300 -l^300 -m^300 "png"^700 ` &crarr;\n>> [ output ]\n /Users/username/Programs/Programs/JavaScript/Classes/output/one.txt\n /Users/username/Programs/Programs/JavaScript/Classes/output/images/one.png ...\n\n>> [ output ]\n /Users/username/Programs/Programs/JavaScript/Classes/output/one-linked.txt\n /Users/username/Programs/Programs/JavaScript/Classes/output/images/one-linked.png ...`' ]
    } );

////    POST    ////////////////////////////////////////////

    injectContent    ( );

    setTypedDefaults ( typedPlantScript    );
    setTypedDefaults ( typedPlantUml       );
    setTypedDefaults ( typedPlantLinkedUml );

    setTypedListener ( typedPlantScript    );
    setTypedListener ( typedPlantUml       );
    setTypedListener ( typedPlantLinkedUml );
