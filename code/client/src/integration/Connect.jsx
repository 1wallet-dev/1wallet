import Button from 'antd/es/button'
import Space from 'antd/es/space'
import Typography from 'antd/es/typography'
import message from '../message'
import AnimatedSection from '../components/AnimatedSection'
import { AverageRow } from '../components/Grid'
import { Li, Ul } from '../components/Text'
import Paths from '../constants/paths'
import React, { useState } from 'react'
import { useRouteMatch, useHistory } from 'react-router'
import { WALLET_OUTDATED_DISABLED_TEXT, WalletSelector, WalletSelectorV2 } from './Common'
import { useTheme, getColorPalette } from '../theme'
import { SecondaryButton } from '../components/Buttons'
const { Title, Text, Paragraph } = Typography
const ConnectWallet = ({ caller, callback }) => {
  console.log(`window.location.href: ${window.location.href}`)
  console.log(`caller: ${caller}`)
  console.log(`callback: ${callback}`)
  const [useHex, setUseHex] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState({})
  const history = useHistory()
  const onAddressSelected = (e) => {
    history.push(Paths.showAddress(e.value))
  }
  const [showOlderVersions, setShowOlderVersions] = useState(false)
  const connect = () => {
    if (!selectedAddress.value) {
      return message.error('No address is selected')
    }
    window.location.href = callback + `?address=${selectedAddress.value}&success=1`
    console.log(`connect window.location.href: ${window.location.href}`)
  }
  const cancel = () => {
    console.log(`callback: ${callback}`)
    window.location.href = callback + '?success=0'
    console.log(`cancel window.location.href: ${window.location.href}`)
  }
  const theme = useTheme()
  const { primaryBgColor, secondaryBgColor, secondaryBorderColor } = getColorPalette(theme)
  return (
    <AnimatedSection
      show
      style={{ minHeight: 320, maxWidth: 720 }}
    >
      <AverageRow>
        <Space direction='vertical'>
          <Title level={3}>"{caller}" wants to connect to your 1wallet</Title>
          <Text>
            <Paragraph>The app will be able to:</Paragraph>
            <Ul>
              <Li><span role='img' aria-label='-'>✅</span> View the address of the connected wallet</Li>
            </Ul>
            <Paragraph>The app cannot:</Paragraph>
            <Ul>
              <Li><span role='img' aria-label='-'>❌</span> Do anything without your permission (e.g. transferring funds, sign transactions, ...)</Li>
            </Ul>
          </Text>
        </Space>
      </AverageRow>
      {/* <WalletSelectorV2 onAddressSelected={onAddressSelected} filter={e => e.majorVersion >= 10} disabledText={WALLET_OUTDATED_DISABLED_TEXT} showOlderVersions={showOlderVersions} useHex={useHex} /> */}
      <WalletSelector onAddressSelected={setSelectedAddress} filter={e => e.majorVersion >= 10} disabledText={WALLET_OUTDATED_DISABLED_TEXT} showOlderVersions={showOlderVersions} useHex={useHex} />
      <Space direction='vertical'>
        <Text>Looking for older addresses? <Button type='link' style={{ padding: 0 }} onClick={() => setShowOlderVersions(!showOlderVersions)}>{!showOlderVersions ? 'Show all addresses' : 'Hide old addresses'}</Button>  </Text>
        {showOlderVersions && <Text>If you still can't find the old address you are looking for, try first going to "About" tab in the latest version of the wallet, then "Inspect" the old address in the list.</Text>}
        <Text><Button style={{ padding: 0 }} type='link' onClick={() => setUseHex(!useHex)}>{!useHex ? 'Show Addresses in Hex Format' : 'Show Addresses in ONE format'}</Button> </Text>
      </Space>
      <AverageRow justify='space-between'>
        <Button size='large' type='text' onClick={cancel} danger>Cancel</Button>
        <Button type='primary' size='large' shape='round' onClick={connect} disabled={!selectedAddress.value}>Connect</Button>
      </AverageRow>

    </AnimatedSection>
  )
}

export default ConnectWallet
