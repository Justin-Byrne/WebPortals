////    GLOBALS     ////////////////////////////////////////

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

        let setDefaults = ( typedObject ) => { for ( let _default in _defaults ) typedObject [ _default ] = _defaults [ _default ]; }

    ////    COMMON  ////////////////////////////////

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

        function addElementToScrollListener ( typedObject )
        {
            window.addEventListener ( 'scroll', ( ) =>
            {
                let elementBox = document.getElementById ( typedObject.el.id ).getBoundingClientRect ( );


                (  ( elementBox.bottom < window.innerHeight )  &&  ( elementBox.bottom > elementBox.height )  )

                    ? typedObject.start ( )

                    : typedObject.reset ( );
            });

            typed.options.onComplete = function ( )
            {
                let element = document.getElementById ( typedObject.el.parentElement.parentElement.getAttribute ( 'for' ) );


                ( element.style.display != 'block' )

                    ? $( element ).show ( 'slide', null, 750, null )

                    : animationBackgroundFlicker ( element.children [ 1 ].children );
            }
        }

////    INSTANTIATION   ////////////////////////////////////

    let typed = new Typed ( '#js-to-plantuml',
    {
        strings: [ '`&rarr; app : `python3^300 BuildClass.py^300 ~/Programs/JavaScript/Classes/class.js^700 ` &crarr;\n>>  [ output ]\n /Users/justinbyrne/Desktop/output/class.txt`' ],
    } );

////    POST    ////////////////////////////////////////////

    setDefaults ( typed );

    addElementToScrollListener ( typed );
