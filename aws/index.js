'use strict';

const
    AWS = require( 'aws-sdk' ),
    S3  = new AWS.S3();

exports.handler = ( event, context, callback ) => {
    console.log( `FUNCTION STARTED: ${new Date()}` );
    
    console.log(event);
    
    const mytitle = event.title;
    
    const mykey = mytitle + '.json';

    S3.putObject( {
         Bucket: 'BUCKET_NAME',
         Key: mykey,
         ContentType: 'application/json',
         Body: JSON.stringify(event)
    } )
         .promise()
         .then( () => console.log( 'UPLOAD SUCCESS' ) )
         .then( () => callback( null, 'MISSION SUCCESS' ) )
         .catch( e => {
            console.error( 'ERROR', e );
            callback( e );
         } );
};
