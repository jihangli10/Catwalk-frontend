import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Track extends React.Component {
  onClick = e => {
    const findElementName = el => {
      let elementName;
      if (el.id) {
        elementName = el.id;
      } else if (el.className) {
        elementName = el.className;
      } else {
        elementName = findElementName(el.parentNode)
      }
      return elementName;
    }

    let elementName = findElementName(e.target).toString();
    let moduleName = this.props.moduleName;
    let timeClicked = (new Date()).toISOString();
    let body = {
      element: elementName,
      widget: moduleName,
      time: timeClicked
    };
    return axios.post('/interactions', body)
      .then((res) => {
        console.log(`click on a/an ${elementName} in module ${moduleName} recorded at ${timeClicked} !`);
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleChildMounted = (el, child) => {
    const DOMNode = ReactDOM.findDOMNode(el);
    if (DOMNode) {
      DOMNode.addEventListener("click", this.onClick);
    }
    if (typeof child.ref === "function") {
      child.ref(el);
    }
  };

  wrapWithClass = comp =>
  class extends React.Component {
    render() {
      return comp;
    }
  };

  remapChildren(children) {
    return React.Children.map(children, child => {
      const ref = el => this.handleChildMounted(el, child);

      // DOM Component, such as:
      // <button />
      if (typeof child.type === "string") {
        return React.cloneElement(child, { ref });

        // Custom Component w/props.children, such as:
        // <MyComponent ... />
        //   <.../>
        //   <.../>
        // </MyComponent>
      } else if (React.Children.count(child.props.children)) {
        return React.cloneElement(child, {
          children: this.remapChildren(child.props.children)
        });

        // Custom Class Component w/o props.children, such as:
        // <MyClassComponent ... />
      } else if (child.type.prototype.render) {
        return React.cloneElement(child, { ref });

        // Custom Function Component w/o props.children, such as:
        // <MyFunctionComponent ... />
      } else {
        return React.createElement(this.wrapWithClass(child), { ref });
      }
    });
  }

  render() {
    return this.remapChildren(this.props.children);
  }
};

export default Track;