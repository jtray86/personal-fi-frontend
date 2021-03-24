import Chart from "react-google-charts";

function PieChart({outgoing}) {
    const filterHousing = outgoing.filter((outgoing)=> outgoing.outgoing_type === "Housing")
    const housingCostAry = filterHousing?.map((house)=> house.projected)
    const housingCost = housingCostAry?.reduce((result, num) =>result+num, 0)

    const filterUtilities = outgoing.filter((outgoing)=> outgoing.outgoing_type === "Utilities")
    const utilitiesCostAry = filterUtilities?.map((utility)=> utility.projected)
    const utilitiesCost = utilitiesCostAry?.reduce((result, num) =>result+num, 0)

    const filterTransportation = outgoing.filter((outgoing)=> outgoing.outgoing_type === "Transportation")
    const transportationCostAry = filterTransportation?.map((trans)=> trans.projected)
    const transportationCost = transportationCostAry?.reduce((result, num) =>result+num, 0)

    const filterInsurance = outgoing.filter((outgoing)=> outgoing.outgoing_type === "Insurance")
    const insuranceCostAry = filterInsurance?.map((insurance_inst)=> insurance_inst.projected)
    const insuranceCost = insuranceCostAry?.reduce((result, num) =>result+num, 0)

    const filterDebt = outgoing.filter((outgoing)=> outgoing.outgoing_type === "Debt")
    const debtCostAry = filterDebt?.map((debt_inst)=> debt_inst.projected)
    const debtCost = debtCostAry?.reduce((result, num) =>result+num, 0)

    const filterLiving = outgoing.filter((outgoing)=> outgoing.outgoing_type === "Living")
    const livingCostAry = filterLiving?.map((living_inst)=> living_inst.projected)
    const livingCost = livingCostAry?.reduce((result, num) =>result+num, 0)

    const filterMiscellaneous = outgoing.filter((outgoing)=> outgoing.outgoing_type === "Miscellaneous")
    const miscellaneousCostAry = filterMiscellaneous?.map((stuff)=> stuff.projected)
    const miscellaneousCost = miscellaneousCostAry?.reduce((result, num) =>result+num, 0)

        
    return(
        <> 
            <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Task', 'Percentage'],
                                ['Housing', housingCost],
                                ['Utilities', utilitiesCost],
                                ['Transportation', transportationCost],
                                ['Insurance', insuranceCost],
                                ['Debt', debtCost],
                                ['Living', livingCost],
                                ['Miscellaneous', miscellaneousCost]
                            ]}
                            options={{
                                legend:{position: 'none'}
                            }}
                            rootProps={{ 'data-testid': '1' }}
                            />
        
        </>
    )
    
}

export default PieChart