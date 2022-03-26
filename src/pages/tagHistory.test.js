import '@testing-library/jest-dom/extend-expect'
import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TagHistory from './TagHistory'

// test('can open accordion items to see the contents', () => {
//     const hats = {title: 'Favorite Hats', contents: 'Fedoras are classy'}
//     const footware = {
//         title: 'Favorite Footware',
//         contents: 'Flipflops are the best',
//     }
//     render(<TagHistory/>)
//
//     expect(screen.getByText("db p")).toBeInTheDocument()
//     expect(screen.queryByText(footware.contents)).not.toBeInTheDocument()
//
//     userEvent.click(screen.getByText(footware.title))
//
//     expect(screen.getByText(footware.contents)).toBeInTheDocument()
//     expect(screen.queryByText(hats.contents)).not.toBeInTheDocument()
// })
