import React from "preact/compat";
import { applyProps, ElbeProps } from "./box";

export type PaddedProps = ElbeProps & {
  children: any;
};

export class Padded extends React.Component<
  PaddedProps & {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }
> {
  constructor(
    props: PaddedProps & {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }
  ) {
    super(props);
  }

  static all = ({ amount = 1, ...p }: PaddedProps & { amount: number }) => (
    <Padded
      {...{ ...p, top: amount, right: amount, bottom: amount, left: amount }}
    />
  );

  static symmetric = ({
    vertical = 0,
    horizontal = 0,
    ...p
  }: PaddedProps & { vertical: number; horizontal: number }) => (
    <Padded
      {...{
        ...p,
        top: vertical,
        bottom: vertical,
        left: horizontal,
        right: horizontal,
      }}
    />
  );

  render() {
    return (
      <div
        {...applyProps(this.props, [], {
          paddingTop: `${this.props.top || 0}rem`,
          paddingRight: `${this.props.right || 0}rem`,
          paddingBottom: `${this.props.bottom || 0}rem`,
          paddingLeft: `${this.props.left || 0}rem`,
        })}
      >
        {this.props.children}
      </div>
    );
  }
}
