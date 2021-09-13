function main(){
    var canvas = document.getElementById("mycanvas");
    var gl = canvas.getContext("webgl");

    // Letak titik (x,y,z, proyeksi)
    var vertexShaderCoder = `
    void main(){
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        gl_PointSize = 20.0;
    }`;
    // Buat titik
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCoder);
    gl.compileShader(vertexShader);

    // Warna titik (R, G, B, Transparansi)
    var fragmentShaderCode = `
    void main(){
        gl_FragColor = vec4(0.0, 0.5, 0.5, 1.0);
    }`;
    
    //buat warna
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    // compile program
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Ngasih warna di canvas
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //Menggambar (bentuk, yang ke- , jumlah)
    gl.drawArrays(gl.POINTS, 0, 1);

}