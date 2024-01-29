import { type ClassValue, clsx } from 'clsx';
import { type PressableStateCallbackType } from 'react-native';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/// The below code was taken from react-native-reuseables.
/// The code is licensed under MIT License.
/// https://github.com/mrzachnugent/react-native-reusables

export function isTextChildren(
  children:
    | React.ReactNode
    | ((state: PressableStateCallbackType) => React.ReactNode)
) {
  return Array.isArray(children)
    ? children.every((child) => typeof child === 'string')
    : typeof children === 'string';
}
