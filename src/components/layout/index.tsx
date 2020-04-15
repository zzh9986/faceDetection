import * as React from "react";
import classnames from "classnames";

const Layout = props => {
	const { className, children, ...others } = props;
	return (
		<div className={classnames("layout", className)} {...others}>
			{children}
		</div>
	);
};

const Header = props => {
	const { total, btns, className, children, ...others } = props;
	return (
		<div className={classnames("layout-header", className)} {...others}>
			<div className="search-line">{children}</div>
			<div className="info-line">
				<div className="left-info-line">{total ? `共${total}条` : ""}</div>
				<div className="right-info-line">
					{/*<Button.Box align={"right"}>
                        {btns
                            ? btns.map((item, index) =>
                                  item.render ? (
                                      <React.Fragment key={index}>{item.render}</React.Fragment>
                                  ) : (
                                      <Button key={index} type="primary" onClick={item.action}>
                                          {item.name}
                                      </Button>
                                  )
                              )
                            : null}
								  </Button.Box>*/}
				</div>
			</div>
		</div>
	);
};

const Content = props => {
	const { className, children, ...others } = props;
	return (
		<div className={classnames("layout-content", className)} {...others}>
			<div className="layout-content-box">{children}</div>
		</div>
	);
};

Layout.Header = Header;
Layout.Content = Content;

export default Layout;
