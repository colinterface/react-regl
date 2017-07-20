'use strict'
import React, { Component } from 'react'
import { render } from 'react-dom'

import Regl from '../../src/Regl';
import Draw  from '../../src/Component';


      
const triVert = `
   precision mediump float;
   attribute vec2 positions;
   void main () {
     gl_Position = vec4(positions, 0, 1);
   }`;

const triFrag =  `
   precision mediump float;
   uniform vec4 color;
   void main () {
     gl_FragColor = color;
   }`;


/* 
 * attributes: {
 *   position: regl.prop('position')
 * },
 * 
 * uniforms: {
 *   color: regl.prop('color')
 * },
 * 
 * count: 3
   });
   }
   }
 */

class TriangleWrapper extends Draw{
  renderTriangles(){
    return this.props.triangles.map((triangleData, index) => {
      return <Triangle key={index}
                       color={triangleData.color}
                       position={triangleData.position}/>;
    });
  }
  
  render(){
    return (
      <Draw>
        {this.renderTriangles()}
        <Nothing />
      </Draw>
    );
  }
}



class Root extends Component {
  constructor(props, context){
    super(props,context);

    this.state = {      
      triangles: [
        {color:[1,1,0.5,1], position:[[-0.5, 0],[0, -0.5],[0.25, 1]]},
        {color:[1,0.5,1,1], position:[[-1, 0],[0, -1],[1, 1]]},
        {color:[0.5,1,1,1], position:[[-1, 1],[1, -1],[1, 0.5]]}
      ]
    };
  }
  
  onFrameHandler(frameState){
    return;
    const live = 0.5 * frameState.tick * 0.01;
    
    this.setState({
      triangles: [
        {color:[1,1,0.5,1], position:[[-0.5, 0],[0, -0.5],[live, 1]]},
        {color:[1,0.5,1,1], position:[[-1, live],[0, -1],[1, 1]]},
        {color:[0.5,1,1,1], position:[[-1, 1],[1, -live],[1, 0.5]]}
      ]
    });
    
  }
  
  render(){
    return (
      <div>
        <h1>...rre</h1>
        <Regl width={window.innerWidth}
              height={window.innerHeight}
              onFrame={this.onFrameHandler.bind(this)}>
          <Draw vert={triVert}
                frag={triFrag}
                attributes={{
                  positions:[[-0.5, 0],[0, -0.5],[0.25, 1]],
                }}
                uniforms={{
                  color: [1,1,0.5,1] 
                }}
                count={3}
          />
        </Regl >
      </div>
    );
  }
}

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

render(
  <Root />,
  document.getElementById('root')
);
