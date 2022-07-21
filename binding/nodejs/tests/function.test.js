const { expect } = require('chai')
const path = require('path')
const Searcher = require('..')

const dbPath = path.join(__dirname, '..', '..', '..', 'data', 'ip2region.xdb')
const buffer = Searcher.loadContentFromFile(dbPath)
const searcher1 = Searcher.newWithBuffer(buffer)

const vectorIndex = Searcher.loadVectorIndexFromFile(dbPath)
const searcher2 = Searcher.newWithVectorIndex(dbPath, vectorIndex)

const searcher3 = Searcher.newWithFileOnly(dbPath)

describe('ip2region', () => {
  it('#newWithFileOnly', async () => {
    const d = await searcher3.search('218.4.167.70')
    expect(d).equal('中国|0|江苏省|苏州市|电信')
  })

  it('#newWithVectorIndex', async () => {
    const d = await searcher2.search('218.4.167.70')
    expect(d).equal('中国|0|江苏省|苏州市|电信')
  })

  it('#newWithBuffer', async () => {
    const d = await searcher1.search('218.4.167.70')
    expect(d).equal('中国|0|江苏省|苏州市|电信')
  })
})
