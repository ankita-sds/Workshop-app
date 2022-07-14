const logger = ( store ) => {
    return ( next ) => {
        return ( action ) => {
            console.log( store.getState() );
            console.log( action );

            // pass control to the next middleware or the store
            next( action );
        };
    };
};

export default logger;