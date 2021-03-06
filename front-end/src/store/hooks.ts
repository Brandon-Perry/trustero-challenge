import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import { AppDispatch, RootState } from './index'

//Use instead of useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector