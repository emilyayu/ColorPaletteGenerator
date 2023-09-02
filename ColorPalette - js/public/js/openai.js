function generateColorCodes(input_description){
    let prompt=`You are a color generating assistant that takes descriptions and generates color palettes based on moods, environments, and descriptions. 
    Based on the description provided, generate 3 to 8 hexidecimal color codes.
    Here is an example of the prompts and responses:
    Q: Convert the following verbal description of a color palette into a list of colors: Wood Wall
    A: ["#D7BA89", "#B68E65", "#986B41", "#56342A" ]
    
    Q: Convert the following verbal description of a color palette into a list of colors: Millennial color scheme
    A: ["#448F58", "#90C26E", "#FFE254", "#DE3657", "#FF9443", "#6A559B" ]

    Desired format: JSON array of hexidecimal color codes.
    Q: ${input_description}
    A:
    `
    openai.
}
