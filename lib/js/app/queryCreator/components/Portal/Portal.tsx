import React from 'react';
import ReactDOM from 'react-dom';

type Props = {
  /** Modal container selector */
  modalContainer: string;
  /** Modal container selector */
  children: React.ReactNode;
};

export default class Portal extends React.Component<Props> {
  element: HTMLDivElement;

  modalRoot: HTMLDivElement;

  constructor(props: Props) {
    super(props);
    this.element = document.createElement('div');
    this.modalRoot = document.querySelector(this.props.modalContainer);
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.element);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.element);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.element);
  }
}
