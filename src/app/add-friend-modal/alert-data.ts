export const alertData = {
    success: {
        header: 'Success!',
        subHeader: 'Friend added',
        message:
            '<p>Your friend has been added.</p>' +
            '<p>Now you can track his position by ticking checkmark besides his name on the friends list.</p>',
        buttons: ['OK'],
    },
    notFound: {
        header: 'Not found :(',
        subHeader: 'Email address not found',
        message:
            '<p>We couldn\'t find you friends address in our database. Most probably he doesn\'t have an account in our app.</p>',
        buttons: ['OK'],
    },
    sameEmailError: {
        header: 'Error :(',
        subHeader: 'You can\'t be your own friend :)',
        message:
            '<p>Ohh, rather - you should be your own friend :)</p>' +
            '<p>It\'s just ... this friendship in this app makes a little sense ...</p>',
        buttons: ['OK'],
    },
    otherError: {
        header: 'Error :(',
        subHeader: 'Unidentified error',
        message:
            '<p>There was some error.</p>' +
            '<p>Most probably with connection. Check our internet connection or try again in a while.</p>',
        buttons: ['OK'],
    },
}
