
function main(){
	
	const canvas = document.querySelector("#glCanvas");
	const gl = canvas.getContext("webgl");
	
	const vsSource = `

		attribute vec4 aVertexPosition;

		varying vec4 v_color;

		void main() {
			gl_Position = aVertexPosition;
			v_color = gl_Position * 0.55;
		}
	`;

	const fsSource = `

		precision mediump float;
		
		varying vec4 v_color;

		void main(void) {
			gl_FragColor = v_color;
		}
	`;
	const shaderProgram = createShaderProgram(gl, vsSource, fsSource);

	const programInfo = {
		program: shaderProgram,
		attribLocations: {
			vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition')
		},
		uniformLocations: {
		},
	};

	function loop(now) {
		drawScene(gl, programInfo);

		requestAnimationFrame(loop);
	}
	requestAnimationFrame(loop);
}

function drawScene(gl, programInfo) {

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.useProgram(programInfo.program); 
	
	gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

	const positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
	const numComponents = 2;  
	const type = gl.FLOAT;    
	const normalize = false;  
	const stride = 0;         
	const offset = 0;         

	gl.vertexAttribPointer(
		programInfo.attribLocations.vertexPosition,
		numComponents,
		type,
		normalize,
		stride,
		offset);
		
	drawSquare(gl, -.2, -.2, .4);
	drawSquare(gl, .3, -.2, .3);
}

function drawSquare(gl, x, y, width){

	const x1 = x;
	const x2 = x + width;
	const y1 = y;
	const y2 = y + width;

	const positions = [
		x1, y2,
		x2, y2,
		x2, y1,
		x1, y2,
		x2, y1,
		x1, y1,
	];

	gl.bufferData(gl.ARRAY_BUFFER,
				new Float32Array(positions),
				gl.STATIC_DRAW);


	gl.drawArrays(gl.TRIANGLES, 0, 6);
}