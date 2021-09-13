function main(){
    var canvas = document.getElementById("mycanvas");
    var gl = canvas.getContext("webgl");

    //titik-titik segitiga A(0.0, 0.5), B(0.5, -0.5), C(-0.5, -0.5)
    var vertices = [
        0.0, 0.5, //Titik A
        0.5, -0.5, //Titik B
        -0.5, -0.5, //Titik C
        // 0.0, 0.5, //Titik A
        // 0.5, -0.5, //Titik B
        // -0.5, -0.5 //Titik C
    ];

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // Definisi Shader
    var vertexShaderCode = `
    attribute vec2 a_Position;
    void main(){
        gl_Position = vec4(a_Position, 0.0, 1.0);
        gl_PointSize = 20.0;
    }`;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShaderCode = `
    void main(){
        gl_FragColor = vec4(0.0, 0.5, 0.5, 1.0);
    }`

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    // Ngasih warna di canvas
    gl.clearColor(0.4, 0.3, 0.2, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);


}