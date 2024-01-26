import MDBox from "components/MDBox"

export default function MDBImage(props) {

    return (
        <div>
            <MDBox
                component="img"
                src={props.src}
                alt={props?.alt}
                sx={{
                    position: (props?.sx?.position) ? (props?.sx?.position) : "relative",
                    zIndex: 1,
                    width: (props?.width) ? (props?.width) : "100%",
                    height: (props?.height) ? (props?.height) : "auto",
                    top: (props?.sx?.top) ? (props?.sx?.top) : "",
                    right: (props?.sx?.right) ? (props?.sx?.right) : "",
                    bottom: (props?.sx?.bottom) ? (props?.sx?.bottom) : "",
                    zIndex: (props?.sx?.zIndex) ? (props?.sx?.zIndex) : "",
                }}
            />
        </div>
    )

}