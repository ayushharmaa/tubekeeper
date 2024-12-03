<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <style>
        #content, 
        #authorize-button, 
        #signout-button 
        {display: none}
    </style>

    <title>Tubesweeper</title>
</head>
<body>
    <nav class="blue">
        <div class="class-wrapper">
            <div class="container">
                <a href="#!" class="brand-logo">Channel Data</a>
            </div>
        </div>
    </nav>
    <br>
    <section>
        <div class="container">
            <p>Login with Google</p>
            <button class="btn red" id="authorize-button">Login</button>
            <button class="btn red" id="signout-button">Log Out</button>
            <br>
            <div id="content">
                <div class="row">
                    <div class="col s6">
                        <form id="channel-form">
                            <div class="input-field">
                                <input type="text" placeholder="Enter channel name" id="channel-input">
                                <input type="submit" value="Get Channel Data" class="btn grey lighten-2">
                            </div>
                        </form>
                    </div>
                    <div id="channel-data" class="col s6"></div>
                </div>
                <div class="row" id="video-container"></div>
            </div>
        </div>
    </section>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="main.js"></script>
    <script async defer src="https://apis.google.com/js/api.js"
        onload="this.onload=function(){};handleClientLoad()"
        onreadystatechange="if (this.readyState === 'complete') this.onload()">
        </script>
</body>
</html>
